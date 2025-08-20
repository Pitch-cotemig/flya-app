import { Injectable } from '@nestjs/common';
import { CreatePlanningDto } from './dto/create-planning.dto';
import { AiService } from 'src/ai/ai.service';

@Injectable()
export class PlanningService {
  constructor(private readonly aiService: AiService) {}

  async create(createPlanningDto: CreatePlanningDto) {
    const prompt = this.buildPrompt(createPlanningDto);
    
    const generatedPlan = await this.aiService.generatePlan(prompt);
      //Validar o plano gerado
    return {
      message: 'Plano de viagem gerado com sucesso!',
      plan: generatedPlan,
    };
  }

  private buildPrompt(dto: CreatePlanningDto): string {
    const prompt = `
      Você é um especialista em viagens da agência "Flya". Sua tarefa é criar um roteiro de viagem **extremamente detalhado, útil e inspirador** para um cliente, baseado nas preferências dele. A resposta DEVE seguir rigorosamente a estrutura Markdown abaixo, sem adicionar nenhuma introdução ou texto antes do título.

      **Estrutura Obrigatória da Resposta:**

      ### Título: [Crie um título criativo para a viagem, ex: "5 Dias de Sol e História em Salvador"]

      **Dia 1: [Nome do Dia, ex: Chegada e Exploração Cultural]**
      - **Manhã:**
        * [Atividade 1]: [Descrição detalhada].
          * **Dica:** [Dica útil].
          * **Custo Estimado:** [Valor].
          * **Duração:** [Tempo].
      - **Tarde:**
        * ...
      - **Noite:**
        * ...

      **Dia X: ...** (Continue para todos os dias)

      ### Resumo Geral da Viagem
      * **Destino Principal:** [Cidade/País]
      * **Duração Total:** [Número de dias]
      * **Orçamento Total Estimado:** [Soma de todos os custos, ex: "Aproximadamente R$ XXXX por pessoa"]
      * **Sugestão de Hospedagem:** [Sugira 1-2 opções de hotéis/pousadas com base no orçamento e estilo da viagem]
      * **Transporte Principal:** [Meio de transporte sugerido para a viagem (aéreo, terrestre)]
      * **Perfil da Viagem:** [Resuma o estilo, ex: "Viagem em família com foco em cultura e praias"]

      ---

      **Preferências do Cliente para Inspirar a Criação:**
      - **Objetivo da Viagem:** ${dto.motivo}
      - **Tipo de Destino Desejado:** ${dto.destino}
      - **Leva Pet?** ${dto.pet}
      - **Orçamento Total:** ${dto.orcamento}
      - **Número de Acompanhantes:** ${dto.acompanhantes}
      - **Transporte Preferencial:** ${dto.transporte}
      - **Clima Preferido:** ${dto.clima.join(', ')}

      Crie o roteiro completo seguindo o formato acima.
      `;
    return prompt;
  }
}
