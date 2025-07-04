import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BagItem, TripData, BagState } from "./types";

const initialState: BagState = {
  items: [],
  tripData: null,
  selectedCategory: "all",
  activeCategory: "clothes",
  lastSync: null,
  isLoading: false,
  error: null,
};

const bagSlice = createSlice({
  name: "bag",
  initialState,
  reducers: {
    // Item management
    addItem: (
      state,
      action: PayloadAction<Omit<BagItem, "id" | "addedAt">>
    ) => {
      const newItem: BagItem = {
        ...action.payload,
        id: Date.now().toString(),
        addedAt: new Date().toISOString(),
      };
      state.items.push(newItem);
    },

    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    toggleItem: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.checked = !item.checked;
      }
    },

    updateItem: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<BagItem> }>
    ) => {
      const { id, updates } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        Object.assign(item, updates);
      }
    },

    // Bulk operations
    clearAllItems: (state) => {
      state.items = [];
    },

    checkAllItems: (state) => {
      state.items.forEach((item) => {
        item.checked = true;
      });
    },

    uncheckAllItems: (state) => {
      state.items.forEach((item) => {
        item.checked = false;
      });
    },

    removeCheckedItems: (state) => {
      state.items = state.items.filter((item) => !item.checked);
    },

    // Category management
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },

    setActiveCategory: (state, action: PayloadAction<string>) => {
      state.activeCategory = action.payload;
    },

    // Trip data
    setTripData: (state, action: PayloadAction<TripData>) => {
      state.tripData = action.payload;
    },

    updateTripData: (state, action: PayloadAction<Partial<TripData>>) => {
      if (state.tripData) {
        Object.assign(state.tripData, action.payload);
      }
    },

    // Loading and error states
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    // Sync management
    setLastSync: (state, action: PayloadAction<string>) => {
      state.lastSync = action.payload;
    },

    // Load initial data (from localStorage or API)
    loadBagData: (state, action: PayloadAction<Partial<BagState>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },

    // Add multiple items at once (for suggestions)
    addMultipleItems: (
      state,
      action: PayloadAction<Omit<BagItem, "id" | "addedAt">[]>
    ) => {
      const newItems = action.payload.map((item) => ({
        ...item,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        addedAt: new Date().toISOString(),
      }));
      state.items.push(...newItems);
    },
  },
});

export const {
  addItem,
  removeItem,
  toggleItem,
  updateItem,
  clearAllItems,
  checkAllItems,
  uncheckAllItems,
  removeCheckedItems,
  setSelectedCategory,
  setActiveCategory,
  setTripData,
  updateTripData,
  setLoading,
  setError,
  setLastSync,
  loadBagData,
  addMultipleItems,
} = bagSlice.actions;

export default bagSlice.reducer;
