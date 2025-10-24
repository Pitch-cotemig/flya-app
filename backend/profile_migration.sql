-- ========================================
-- MIGRAÇÃO PROFILE - EXECUTAR NO SUPABASE
-- ========================================

-- 0. Remover coluna two_factor_enabled da tabela profiles (se existir)
ALTER TABLE profiles DROP COLUMN IF EXISTS two_factor_enabled;

-- 1. Criar tabela para códigos de autenticação de dois fatores
CREATE TABLE IF NOT EXISTS two_factor_codes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    code VARCHAR(6) NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_two_factor_codes_email ON two_factor_codes(email);
CREATE INDEX IF NOT EXISTS idx_two_factor_codes_expires ON two_factor_codes(expires_at);

-- 2. Criar tabela para configurações de segurança
CREATE TABLE IF NOT EXISTS security_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    password_changed_at TIMESTAMP WITH TIME ZONE,
    sessions_terminated_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- 3. Criar tabela para configurações de notificação
CREATE TABLE IF NOT EXISTS notification_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    email_atualizacoes_viagem BOOLEAN DEFAULT TRUE,
    email_atualizacoes_viagem_freq TEXT DEFAULT 'instantaneo',
    email_confirmacoes_reserva BOOLEAN DEFAULT TRUE,
    email_dicas_destino BOOLEAN DEFAULT FALSE,
    email_dicas_destino_freq TEXT DEFAULT 'semanal',
    email_ofertas_promocionais BOOLEAN DEFAULT FALSE,
    email_ofertas_promocionais_freq TEXT DEFAULT 'semanal',
    push_atualizacoes_tempo_real BOOLEAN DEFAULT TRUE,
    push_lembretes_checkin BOOLEAN DEFAULT TRUE,
    push_alertas_clima BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- 3. Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 4. Triggers para atualizar updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_security_settings_updated_at ON security_settings;
CREATE TRIGGER update_security_settings_updated_at
    BEFORE UPDATE ON security_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_notification_settings_updated_at ON notification_settings;
CREATE TRIGGER update_notification_settings_updated_at
    BEFORE UPDATE ON notification_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 5. Políticas RLS para two_factor_codes
ALTER TABLE two_factor_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own 2FA codes" ON two_factor_codes
    FOR ALL USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- 6. Políticas RLS para security_settings
ALTER TABLE security_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own security settings" ON security_settings
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own security settings" ON security_settings
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own security settings" ON security_settings
    FOR UPDATE USING (auth.uid() = user_id);

-- 7. Políticas RLS para notification_settings
ALTER TABLE notification_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notification settings" ON notification_settings
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own notification settings" ON notification_settings
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own notification settings" ON notification_settings
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own notification settings" ON notification_settings
    FOR DELETE USING (auth.uid() = user_id);

-- ========================================
-- CONFIGURAR NO PAINEL DO SUPABASE STORAGE
-- ========================================

-- 1. Criar bucket 'avatars' (público)
-- 2. Configurar políticas:

/*
CREATE POLICY "Users can upload their own avatar" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Avatar images are publicly accessible" ON storage.objects
FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "Users can update their own avatar" ON storage.objects
FOR UPDATE USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own avatar" ON storage.objects
FOR DELETE USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
*/