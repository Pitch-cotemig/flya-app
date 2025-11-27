import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class PhotosService {
  private readonly accessKey: string | undefined;

  constructor(private readonly configService: ConfigService) {
    this.accessKey = this.configService.get<string>('UNSPLASH_ACCESS_KEY');
  }

  async findPhotoForLocation(query: string): Promise<string | null> {
    if (!this.accessKey) {
      console.error('Access Key da Unsplash não configurada.');
      return null;
    }

    try {
      const response = await axios.get(
        'https://api.unsplash.com/search/photos',
        {
          params: {
            query,
            per_page: 1,
            orientation: 'landscape',
          },
          headers: {
            Authorization: `Client-ID ${this.accessKey}`,
          },
        },
      );

      if (
        response.data &&
        response.data.results &&
        response.data.results.length > 0
      ) {
        return response.data.results[0].urls.regular;
      }
      return null;
    } catch (error) {
      console.error('Erro ao buscar foto na Unsplash:', error.message);
      return null;
    }
  }
}
