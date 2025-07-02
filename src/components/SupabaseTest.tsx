import React, { useState } from 'react';
import { testSupabaseConnection, listTables } from '../lib/supabase';

interface TestResult {
  success: boolean;
  message: string;
  tables?: string[];
}

const SupabaseTest: React.FC = () => {
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTest = async () => {
    setLoading(true);
    setTestResult(null);

    try {
      console.log('🧪 Iniciando teste de conexão com Supabase...');
      
      const isConnected = await testSupabaseConnection();
      
      if (isConnected) {
        const tables = await listTables();
        setTestResult({
          success: true,
          message: 'Conexão com Supabase estabelecida com sucesso!',
          tables: tables
        });
      } else {
        setTestResult({
          success: false,
          message: 'Falha na conexão com Supabase. Verifique as configurações.'
        });
      }
    } catch (error) {
      setTestResult({
        success: false,
        message: `Erro: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      padding: '20px', 
      border: '1px solid #ddd', 
      borderRadius: '8px', 
      margin: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h3>🧪 Teste de Conexão Supabase</h3>
      
      <button 
        onClick={handleTest} 
        disabled={loading}
        style={{
          padding: '10px 20px',
          backgroundColor: loading ? '#ccc' : '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? '🔄 Testando...' : '🚀 Testar Conexão'}
      </button>

      {testResult && (
        <div style={{ 
          marginTop: '15px', 
          padding: '10px', 
          borderRadius: '4px',
          backgroundColor: testResult.success ? '#d4edda' : '#f8d7da',
          border: testResult.success ? '1px solid #c3e6cb' : '1px solid #f5c6cb',
          color: testResult.success ? '#155724' : '#721c24'
        }}>
          <strong>{testResult.success ? '✅ Sucesso' : '❌ Erro'}</strong>
          <p>{testResult.message}</p>
          
          {testResult.tables && testResult.tables.length > 0 && (
            <div>
              <strong>📋 Tabelas encontradas:</strong>
              <ul>
                {testResult.tables.map((table, index) => (
                  <li key={index}>{table}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div style={{ marginTop: '15px', fontSize: '12px', color: '#666' }}>
        <p><strong>📝 Instruções:</strong></p>
        <ol>
          <li>Acesse o <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer">painel do Supabase</a></li>
          <li>Vá para Settings → API</li>
          <li>Copie a "anon public" key</li>
          <li>Cole no arquivo .env.local na variável VITE_SUPABASE_ANON_KEY</li>
          <li>Reinicie o servidor de desenvolvimento</li>
        </ol>
      </div>
    </div>
  );
};

export default SupabaseTest;
