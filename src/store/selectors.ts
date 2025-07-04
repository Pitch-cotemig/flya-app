import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { BagItem, BagState } from "./types";

// Base selectors
export const selectBag = (state: RootState): BagState => state.bag;
export const selectItems = (state: RootState): BagItem[] => state.bag.items;
export const selectTripData = (state: RootState) => state.bag.tripData;
export const selectSelectedCategory = (state: RootState): string =>
  state.bag.selectedCategory;
export const selectActiveCategory = (state: RootState): string =>
  state.bag.activeCategory;
export const selectIsLoading = (state: RootState): boolean =>
  state.bag.isLoading;
export const selectError = (state: RootState): string | null => state.bag.error;
export const selectLastSync = (state: RootState): string | null =>
  state.bag.lastSync;

// Computed selectors
export const selectFilteredItems = createSelector(
  [selectItems, selectSelectedCategory],
  (items, selectedCategory) => {
    if (selectedCategory === "all") {
      return items;
    }
    return items.filter((item) => item.category === selectedCategory);
  }
);

export const selectCheckedItems = createSelector([selectItems], (items) =>
  items.filter((item) => item.checked)
);

export const selectUncheckedItems = createSelector([selectItems], (items) =>
  items.filter((item) => !item.checked)
);

export const selectEssentialItems = createSelector([selectItems], (items) =>
  items.filter((item) => item.essential)
);

export const selectItemsByCategory = createSelector([selectItems], (items) => {
  const categorizedItems: Record<string, typeof items> = {};
  items.forEach((item) => {
    if (!categorizedItems[item.category]) {
      categorizedItems[item.category] = [];
    }
    categorizedItems[item.category].push(item);
  });
  return categorizedItems;
});

export const selectBagProgress = createSelector(
  [selectItems, selectCheckedItems],
  (items, checkedItems) => {
    const total = items.length;
    const checked = checkedItems.length;
    const progress = total > 0 ? (checked / total) * 100 : 0;

    return {
      total,
      checked,
      remaining: total - checked,
      progress: Math.round(progress),
    };
  }
);

export const selectBagStats = createSelector(
  [selectItems, selectItemsByCategory, selectEssentialItems],
  (items, itemsByCategory, essentialItems) => {
    const categories = Object.keys(itemsByCategory);
    const essentialChecked = essentialItems.filter(
      (item) => item.checked
    ).length;

    return {
      totalItems: items.length,
      totalCategories: categories.length,
      essentialItems: essentialItems.length,
      essentialChecked,
      categoryBreakdown: categories.map((category) => ({
        category,
        count: itemsByCategory[category].length,
        checked: itemsByCategory[category].filter((item) => item.checked)
          .length,
      })),
    };
  }
);

export const selectRecentItems = createSelector([selectItems], (items) => {
  return items
    .sort(
      (a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
    )
    .slice(0, 5);
});

export const selectIsEmpty = createSelector(
  [selectItems],
  (items) => items.length === 0
);

export const selectHasUncheckedEssentials = createSelector(
  [selectEssentialItems],
  (essentialItems) => essentialItems.some((item) => !item.checked)
);
