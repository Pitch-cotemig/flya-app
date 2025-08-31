import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class CurrencyService {
  private readonly apiKey: string | undefined;

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get<string>('EXCHANGERATE_API_KEY');
  }

  async getExchangeRate(
    baseCurrency: string,
    targetCurrency: string,
  ): Promise<number | null> {
    if (!this.apiKey) {
      console.error('API Key do ExchangeRate não configurada.');
      return null;
    }

    try {
      const response = await axios.get(
        `https://v6.exchangerate-api.com/v6/${this.apiKey}/pair/${baseCurrency}/${targetCurrency}`,
      );
      
      if (response.data && response.data.result === 'success') {
        return response.data.conversion_rate;
      }
      return null;
    } catch (error) {
      console.error('Erro ao buscar taxa de câmbio:', error.message);
      return null;
    }
  }
}
