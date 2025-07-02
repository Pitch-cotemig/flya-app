import { PrismaClient } from "./generated/prisma/index.js";

const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log("🔍 Testando conexão com o banco de dados Supabase...");
    console.log(
      "📡 URL:",
      process.env.DATABASE_URL?.replace(/:[^:]*@/, ":***@")
    );

    // Tenta fazer uma query simples
    const result = await prisma.$queryRaw`SELECT version()`;
    console.log("✅ Conexão bem-sucedida!");
    console.log("🐘 Versão do PostgreSQL:", result[0].version);

    // Testa listar tabelas
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
    `;
    console.log("📋 Tabelas encontradas:", tables.length);
    tables.forEach((table) => {
      console.log("  -", table.table_name);
    });
  } catch (error) {
    console.error("❌ Erro na conexão:");
    console.error("Mensagem:", error.message);
    if (error.code) {
      console.error("Código:", error.code);
    }
    if (error.meta) {
      console.error("Meta:", error.meta);
    }
  } finally {
    await prisma.$disconnect();
    console.log("🔌 Conexão fechada.");
  }
}

testConnection();
