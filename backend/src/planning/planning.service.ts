import { Injectable } from '@nestjs/common';
import { CreatePlanningDto } from './dto/create-planning.dto';
import { AiService } from 'src/ai/ai.service';

@Injectable()
export class PlanningService {
  constructor(private readonly aiService: AiService) {}

  async create(createPlanningDto: CreatePlanningDto) {
    const prompt = this.buildPrompt(createPlanningDto);
    
    const generatedPlan = await this.aiService.generatePlan(prompt);

    return {
      message: 'Plano de viagem gerado com sucesso!',
      plan: generatedPlan,
    };
  }

  private buildPrompt(dto: CreatePlanningDto): string {
    let promptParts: string[] = [];

    promptParts.push(`Planeje um roteiro de viagem com as seguintes características:`);
    promptParts.push(`- Motivo da Viagem: ${dto.motivo}.`);
    promptParts.push(`- Tipo de Destino: ${dto.destino}.`);
    
    if (dto.pet === 'Sim') {
      promptParts.push(`- O viajante levará um pet.`);
    }

    promptParts.push(`- Orçamento: ${dto.orcamento}.`);
    promptParts.push(`- Número de Acompanhantes: ${dto.acompanhantes}.`);

    if (dto.transporte !== 'Não') {
      promptParts.push(`- Preferência de Transporte: ${dto.transporte.replace('Sim, ', '')}.`);
    }

    if (dto.clima.length > 0) {
      promptParts.push(`- Preferência de Clima: ${dto.clima.join(', ')}.`);
    }
    
    promptParts.push(`\nCrie um roteiro detalhado dia a dia baseado nessas informações.`);

    return promptParts.join('\n');
  }
}
