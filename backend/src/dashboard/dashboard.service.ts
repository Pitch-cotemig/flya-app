import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';
import {
  DashboardStatsDto,
  RecentTripDto,
  MonthlyTripDto,
  DestinationDto,
} from './dto/dashboard-stats.dto';

@Injectable()
export class DashboardService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getStats(userId: string): Promise<DashboardStatsDto> {
    try {
      const supabase = this.supabaseService.getClient();

      // Fetch all user trips
      const { data: trips, error } = await supabase
        .from('trips')
        .select('id, plan_result, is_favorite, prompt_data, created_at')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        throw new InternalServerErrorException(error.message);
      }

      if (!trips || trips.length === 0) {
        return this.getEmptyStats();
      }

      // Calculate statistics
      const totalTrips = trips.length;
      const favoriteTrips = trips.filter((trip) => trip.is_favorite).length;

      // Parse recent trips (last 5)
      const recentTrips: RecentTripDto[] = trips.slice(0, 5).map((trip) => {
        const promptData = trip.prompt_data as any;
        return {
          id: trip.id,
          destination: promptData?.destino || 'Destino não especificado',
          startDate: promptData?.dataInicio || '',
          endDate: promptData?.dataFim || '',
          isFavorite: trip.is_favorite || false,
          createdAt: trip.created_at,
        };
      });

      // Count unique destinations
      const destinations = new Map<string, number>();
      trips.forEach((trip) => {
        const promptData = trip.prompt_data as any;
        const destination = promptData?.destino;
        if (destination) {
          destinations.set(
            destination,
            (destinations.get(destination) || 0) + 1,
          );
        }
      });

      const totalDestinations = destinations.size;

      // Most visited destinations (top 5)
      const mostVisitedDestinations: DestinationDto[] = Array.from(
        destinations.entries(),
      )
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name, count]) => ({ name, count }));

      // Calculate trips by month (last 12 months)
      const tripsByMonth = this.calculateTripsByMonth(trips);

      // Calculate average trip duration
      const averageTripDuration = this.calculateAverageDuration(trips);

      // Calculate total budget spent
      const totalBudgetSpent = this.calculateTotalBudget(trips);

      return {
        totalTrips,
        favoriteTrips,
        totalDestinations,
        averageTripDuration,
        totalBudgetSpent,
        recentTrips,
        tripsByMonth,
        mostVisitedDestinations,
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw new InternalServerErrorException(
        'Failed to fetch dashboard statistics',
      );
    }
  }

  private getEmptyStats(): DashboardStatsDto {
    return {
      totalTrips: 0,
      favoriteTrips: 0,
      totalDestinations: 0,
      averageTripDuration: 0,
      totalBudgetSpent: 0,
      recentTrips: [],
      tripsByMonth: [],
      mostVisitedDestinations: [],
    };
  }

  private calculateTripsByMonth(trips: any[]): MonthlyTripDto[] {
    const monthlyData = new Map<string, { count: number; year: number }>();
    const monthNames = [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ];

    trips.forEach((trip) => {
      const date = new Date(trip.created_at);
      const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
      const existing = monthlyData.get(monthKey);

      if (existing) {
        existing.count++;
      } else {
        monthlyData.set(monthKey, {
          count: 1,
          year: date.getFullYear(),
        });
      }
    });

    // Get last 12 months
    const result: MonthlyTripDto[] = [];
    const now = new Date();

    for (let i = 11; i >= 0; i--) {
      const targetDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = `${targetDate.getFullYear()}-${targetDate.getMonth()}`;
      const data = monthlyData.get(monthKey);

      result.push({
        month: monthNames[targetDate.getMonth()],
        year: targetDate.getFullYear(),
        count: data?.count || 0,
      });
    }

    return result;
  }

  private calculateAverageDuration(trips: any[]): number {
    let totalDays = 0;
    let validTrips = 0;

    trips.forEach((trip) => {
      const promptData = trip.prompt_data as any;
      if (promptData?.dataInicio && promptData?.dataFim) {
        const start = new Date(promptData.dataInicio);
        const end = new Date(promptData.dataFim);
        const duration = Math.ceil(
          (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
        );

        if (duration > 0) {
          totalDays += duration;
          validTrips++;
        }
      }
    });

    return validTrips > 0 ? Math.round(totalDays / validTrips) : 0;
  }

  private calculateTotalBudget(trips: any[]): number {
    let total = 0;

    trips.forEach((trip) => {
      const promptData = trip.prompt_data as any;
      if (promptData?.orcamento) {
        const budget = parseFloat(promptData.orcamento);
        if (!isNaN(budget)) {
          total += budget;
        }
      }
    });

    return total;
  }
}
