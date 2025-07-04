export interface BagItem {
  id: string;
  name: string;
  category: string;
  checked: boolean;
  essential: boolean;
  addedAt: string;
}

export interface TripData {
  destination: string;
  duration: number;
  startDate?: string;
  endDate?: string;
}

export interface BagState {
  items: BagItem[];
  tripData: TripData | null;
  selectedCategory: string;
  activeCategory: string;
  lastSync: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface BagProgress {
  total: number;
  checked: number;
  remaining: number;
  progress: number;
}

export interface BagStats {
  totalItems: number;
  totalCategories: number;
  essentialItems: number;
  essentialChecked: number;
  categoryBreakdown: {
    category: string;
    count: number;
    checked: number;
  }[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}
