import Groq from 'groq-sdk';

// Opcional: defina o runtime da Vercel para edge para melhor performance
export const runtime = 'edge';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const formData = await req.json();

    const prompt = `
      Você é um assistente de viagens expert em criar roteiros detalhados e otimizados. 
      Com base nas seguintes informações, gere um planejamento de viagem completo e bem estruturado.
      O roteiro deve ser prático, com sugestões de atividades, locais para visitar e dicas úteis.

      Informações do usuário:
      - Destino: ${formData.destino}
      - Duração: ${formData.duracao} dias
      - Estilo da Viagem: ${formData.estilo}
      - Orçamento: ${formData.orcamento}
      - Preferências Adicionais: ${formData.preferencias}

      Formato da resposta:
      A resposta DEVE ser um roteiro dia a dia. Para cada dia, inclua sugestões para manhã, tarde e noite.
      Exemplo:
      **Dia 1: Chegada e Exploração Inicial**
      *   **Manhã:** Chegada ao aeroporto, transporte para o hotel e check-in.
      *   **Tarde:** Almoço em um restaurante local (sugestão: [Nome do Restaurante]) e primeira caminhada pelo centro histórico.
      *   **Noite:** Jantar especial para celebrar o início da viagem (sugestão: [Nome do Restaurante]) e um passeio leve.
      
      **Dia 2: [Tema do Dia]**
      *   **Manhã:** ...
      *   **Tarde:** ...
      *   **Noite:** ...
    `;

    const response = await groq.chat.completions.create({
      model: 'llama3-70b-8192', // Usando o modelo mais poderoso para um bom roteiro
      messages: [
        { role: 'system', content: 'Você é um planejador de viagens profissional.' },
        { role: 'user', content: prompt }
      ],
      stream: false, // Não queremos streaming, queremos a resposta completa
    });

    const plan = response.choices[0]?.message?.content;

    if (!plan) {
      throw new Error('Não foi possível gerar um plano de viagem.');
    }

    return new Response(JSON.stringify({ plan }), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Erro ao gerar roteiro:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return new Response(JSON.stringify({ error: `Falha ao contatar a IA: ${errorMessage}` }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
} 