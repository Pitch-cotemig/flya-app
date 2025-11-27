import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class WeatherService {
  private readonly apiKey: string | undefined;

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get<string>('OPENWEATHER_API_KEY');
  }

  async getWeatherForLocation(lat: number, lon: number): Promise<any | null> {
    if (!this.apiKey) {
      console.error('API Key do OpenWeather não configurada.');
      return null;
    }

    try {
      const response = await axios.get(
        'https://api.openweathermap.org/data/2.5/forecast',
        {
          params: {
            lat,
            lon,
            appid: this.apiKey,
            units: 'metric',
            lang: 'pt_br',
            cnt: 40,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar previsão do tempo:', error.message);
      return null;
    }
  }
}
