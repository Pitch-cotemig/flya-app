import { createClient } from '@supabase/supabase-js'

// Configuração do Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Teste de conexão com o Supabase
export async function testSupabaseConnection() {
  try {
    console.log('🔍 Testando conexão com Supabase via API REST...')
    console.log('🌐 URL:', supabaseUrl)
    
    // Teste básico - verificar se conseguimos acessar o Supabase
    const { data, error } = await supabase.auth.getSession()
    
    if (error && error.message !== 'Auth session missing!') {
      console.error('❌ Erro ao conectar:', error.message)
      return false
    }
    
    console.log('✅ Conexão com Supabase bem-sucedida!')
    console.log('🔑 Sessão:', data.session ? 'Ativa' : 'Não autenticado (normal)')
    
    return true
    
  } catch (error) {
    console.error('❌ Erro na conexão:', error.message)
    return false
  }
}

// Função para listar tabelas (requer configuração adequada no RLS)
export async function listTables() {
  try {
    // Esta função só funcionará se você tiver tabelas públicas configuradas
    const { data, error } = await supabase
      .rpc('get_public_tables') // Você precisará criar esta função no Supabase
    
    if (error) {
      console.log('ℹ️ Para listar tabelas, você precisa configurar uma função RPC no Supabase')
      return []
    }
    
    return data || []
  } catch (error) {
    console.log('ℹ️ Listagem de tabelas requer configuração adicional no Supabase')
    return []
  }
}
