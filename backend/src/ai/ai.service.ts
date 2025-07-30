import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Groq from 'groq-sdk';

@Injectable()
export class AiService {
  private readonly groq: Groq;

  constructor(private readonly configService: ConfigService) {
    this.groq = new Groq({
      apiKey: this.configService.get<string>('GROQ_API_KEY'),
    });
  }

  async generatePlan(prompt: string): Promise<string> {
    try {
      const completion = await this.groq.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'llama3-8b-8192',
      });

      return completion.choices[0]?.message?.content || 'Não foi possível gerar um plano.';
    } catch (error) {
      console.error('Erro ao chamar a API da Groq:', error);
      throw new Error('Falha ao gerar o plano de viagem.');
    }
  }
}
