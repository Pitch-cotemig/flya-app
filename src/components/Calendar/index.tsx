import React from "react";
import {
  DayPicker,
  DayPickerSingleProps,
  DayPickerRangeProps,
  DateRange,
} from "react-day-picker";
import "react-day-picker/dist/style.css";
import { CalendarContainer, CalendarWrapper } from "./styles";

interface CalendarProps {
  mode?: "single" | "range" | "multiple";
  selected?: Date | Date[] | DateRange;
  onSelect?: (date: Date | Date[] | DateRange | undefined) => void;
  disabled?: Date | Date[] | ((date: Date) => boolean);
  className?: string;
  showOutsideDays?: boolean;
  fixedWeeks?: boolean;
  numberOfMonths?: number;
  pagedNavigation?: boolean;
  fromDate?: Date;
  toDate?: Date;
}

const Calendar: React.FC<CalendarProps> = ({
  mode = "single",
  selected,
  onSelect,
  disabled,
  className,
  showOutsideDays = true,
  fixedWeeks = false,
  numberOfMonths = 1,
  pagedNavigation = false,
  fromDate,
  toDate,
  ...props
}) => {
  const commonProps = {
    showOutsideDays,
    fixedWeeks,
    numberOfMonths,
    pagedNavigation,
    fromDate,
    toDate,
    disabled,
    className,
    ...props,
  };

  if (mode === "single") {
    return (
      <CalendarContainer>
        <CalendarWrapper>
          <DayPicker
            mode="single"
            selected={selected as Date}
            onSelect={onSelect as DayPickerSingleProps["onSelect"]}
            {...commonProps}
          />
        </CalendarWrapper>
      </CalendarContainer>
    );
  }

  if (mode === "range") {
    return (
      <CalendarContainer>
        <CalendarWrapper>
          <DayPicker
            mode="range"
            selected={selected as DateRange}
            onSelect={onSelect as DayPickerRangeProps["onSelect"]}
            {...commonProps}
          />
        </CalendarWrapper>
      </CalendarContainer>
    );
  }

  if (mode === "multiple") {
    return (
      <CalendarContainer>
        <CalendarWrapper>
          <DayPicker
            mode="multiple"
            selected={selected as Date[]}
            onSelect={onSelect as (dates: Date[] | undefined) => void}
            {...commonProps}
          />
        </CalendarWrapper>
      </CalendarContainer>
    );
  }

  return (
    <CalendarContainer>
      <CalendarWrapper>
        <DayPicker {...commonProps} />
      </CalendarWrapper>
    </CalendarContainer>
  );
};

export default Calendar;
