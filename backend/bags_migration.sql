-- Criação da tabela bags
CREATE TABLE IF NOT EXISTS bags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  trip_id UUID NOT NULL,
  user_id UUID NOT NULL,
  items JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraint para garantir uma mala por usuário por viagem
  UNIQUE(trip_id, user_id)
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_bags_trip_id ON bags(trip_id);
CREATE INDEX IF NOT EXISTS idx_bags_user_id ON bags(user_id);
CREATE INDEX IF NOT EXISTS idx_bags_trip_user ON bags(trip_id, user_id);

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_bags_updated_at 
    BEFORE UPDATE ON bags 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security) - opcional, dependendo da sua configuração
-- ALTER TABLE bags ENABLE ROW LEVEL SECURITY;

-- Política para usuários só verem suas próprias malas
-- CREATE POLICY "Users can view own bags" ON bags
--   FOR SELECT USING (auth.uid() = user_id);

-- CREATE POLICY "Users can insert own bags" ON bags
--   FOR INSERT WITH CHECK (auth.uid() = user_id);

-- CREATE POLICY "Users can update own bags" ON bags
--   FOR UPDATE USING (auth.uid() = user_id);

-- CREATE POLICY "Users can delete own bags" ON bags
--   FOR DELETE USING (auth.uid() = user_id);