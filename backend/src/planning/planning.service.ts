import { Injectable } from '@nestjs/common';
import { CreatePlanningDto } from './dto/create-planning.dto';

@Injectable()
export class PlanningService {
  create(createPlanningDto: CreatePlanningDto) {
    const prompt = this.buildPrompt(createPlanningDto);
    console.log('Prompt Gerado:', prompt);

    // Futuramente, a lógica para chamar a IA virá aqui.
    // Usaremos a variável 'prompt'.
    return {
      message: 'Prompt gerado com sucesso!',
      prompt: prompt,
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
