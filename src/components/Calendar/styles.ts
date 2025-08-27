import styled from "styled-components";

export const CalendarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
`;

export const CalendarWrapper = styled.div`
  .rdp {
    --rdp-cell-size: 40px;
    --rdp-accent-color: ${({ theme }) => theme.colors.primary[500]};
    --rdp-background-color: ${({ theme }) => theme.colors.white};
    --rdp-accent-color-dark: ${({ theme }) => theme.colors.primary[700]};
    --rdp-background-color-dark: ${({ theme }) => theme.colors.gray[800]};
    --rdp-outline: 2px solid var(--rdp-accent-color);
    --rdp-outline-selected: 3px solid var(--rdp-accent-color);
    margin: 0;
  }

  .rdp-month {
    margin: 0;
  }

  .rdp-table {
    max-width: 100%;
  }

  .rdp-head_cell {
    font-weight: 600;
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.gray[500]};
    padding: 0.5rem;
  }

  .rdp-cell {
    padding: 0.125rem;
  }

  .rdp-button {
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.2s ease-in-out;
    width: var(--rdp-cell-size);
    height: var(--rdp-cell-size);
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    color: ${({ theme }) => theme.colors.gray[800]};
    cursor: pointer;

    &:hover:not([disabled]) {
      background-color: ${({ theme }) => theme.colors.primary[500]}20;
      color: ${({ theme }) => theme.colors.primary[500]};
    }

    &:focus {
      outline: var(--rdp-outline);
      outline-offset: 2px;
    }
  }

  .rdp-day_selected {
    background-color: var(--rdp-accent-color) !important;
    color: white !important;
    font-weight: 600;

    &:hover {
      background-color: var(--rdp-accent-color-dark) !important;
    }
  }

  .rdp-day_today {
    font-weight: 600;
    color: var(--rdp-accent-color);
    border: 2px solid var(--rdp-accent-color);
  }

  .rdp-day_today.rdp-day_selected {
    border: 2px solid white;
  }

  .rdp-day_outside {
    color: ${({ theme }) => theme.colors.gray[400]};
    opacity: 0.5;
  }

  .rdp-day_disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .rdp-day_range_start,
  .rdp-day_range_end {
    background-color: var(--rdp-accent-color) !important;
    color: white !important;
    font-weight: 600;
  }

  .rdp-day_range_middle {
    background-color: ${({ theme }) => theme.colors.primary[500]}20;
    color: var(--rdp-accent-color);
  }

  .rdp-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .rdp-nav_button {
    border: none;
    background: transparent;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 6px;
    color: ${({ theme }) => theme.colors.gray[800]};
    transition: all 0.2s ease-in-out;

    &:hover:not([disabled]) {
      background-color: ${({ theme }) => theme.colors.primary[500]}20;
      color: ${({ theme }) => theme.colors.primary[500]};
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }

  .rdp-caption_label {
    font-size: 1.125rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.gray[800]};
  }

  .rdp-months {
    display: flex;
    gap: 2rem;
  }

  @media (max-width: 768px) {
    .rdp-months {
      flex-direction: column;
      gap: 1rem;
    }

    .rdp {
      --rdp-cell-size: 36px;
    }
  }
`;
