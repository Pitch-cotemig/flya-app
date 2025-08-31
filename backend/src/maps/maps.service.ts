import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MapsService {
  // Converte um endereço em texto para coordenadas geográficas
  async getCoordinatesForAddress(address: string): Promise<{ lat: number; lon: number } | null> {
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: address,
          format: 'json',
          limit: 1,
        },
        headers: { 'User-Agent': 'FlyaApp/1.0' }, // A API do Nominatim exige um User-Agent
      });

      if (response.data && response.data.length > 0) {
        const { lat, lon } = response.data[0];
        return { lat: parseFloat(lat), lon: parseFloat(lon) };
      }
      return null;
    } catch (error) {
      console.error('Erro ao buscar coordenadas no Nominatim:', error.message);
      return null;
    }
  }

  // Calcula a rota e o tempo de viagem entre duas coordenadas
  async getDirections(start: { lat: number; lon: number }, end: { lat: number; lon: number }): Promise<{ duration: number; distance: number } | null> {
    try {
      const response = await axios.get(`http://router.project-osrm.org/route/v1/driving/${start.lon},${start.lat};${end.lon},${end.lat}?overview=false`);
      
      if (response.data && response.data.routes && response.data.routes.length > 0) {
        const route = response.data.routes[0];
        // Duração em segundos, distância em metros
        return { duration: route.duration, distance: route.distance };
      }
      return null;
    } catch (error) {
      console.error('Erro ao buscar rota no OSRM:', error.message);
      return null;
    }
  }
}
