export class DashboardStatsDto {
  totalTrips: number;
  favoriteTrips: number;
  totalDestinations: number;
  averageTripDuration: number;
  totalBudgetSpent: number;
  recentTrips: RecentTripDto[];
  tripsByMonth: MonthlyTripDto[];
  mostVisitedDestinations: DestinationDto[];
}

export class RecentTripDto {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  isFavorite: boolean;
  createdAt: string;
}

export class MonthlyTripDto {
  month: string;
  count: number;
  year: number;
}

export class DestinationDto {
  name: string;
  count: number;
}
