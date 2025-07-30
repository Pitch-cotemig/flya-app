import { Injectable } from '@nestjs/common';
import { CreatePlanningDto } from './dto/create-planning.dto';

@Injectable()
export class PlanningService {
  create(createPlanningDto: CreatePlanningDto) {
    console.log('Dados recebidos do formulário:', createPlanningDto);
    
    // Futuramente, a lógica para chamar a IA virá aqui.
    // Por enquanto, retornamos uma mensagem de sucesso.
    return {
      message: 'Dados do planejamento recebidos com sucesso!',
      data: createPlanningDto,
    };
  }
}
