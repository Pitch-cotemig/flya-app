import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class EventsService {
  private readonly apiKey: string | undefined;

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get<string>('TICKETMASTER_API_KEY');
  }

  async findEvents(
    city: string,
    startDateTime: string,
    endDateTime: string,
  ): Promise<any | null> {
    if (!this.apiKey) {
      console.error('API Key da Ticketmaster não configurada.');
      return null;
    }

    try {
      const response = await axios.get(
        'https://app.ticketmaster.com/discovery/v2/events.json',
        {
          params: {
            apikey: this.apiKey,
            city,
            startDateTime,
            endDateTime,
            sort: 'date,asc',
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar eventos na Ticketmaster:', error.message);
      return null;
    }
  }
}
