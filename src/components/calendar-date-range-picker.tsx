"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format, addDays, differenceInCalendarDays } from "date-fns";
import { vi } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

interface DateRangePickerProps {
  value?: DateRange;               // Giá trị truyền vào (optional)
  onChange?: (dates: Date[]) => void;  // Callback trả về mảng ngày được chọn
}

export function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange>(
    value ?? { from: undefined, to: undefined }
  );

  // Đồng bộ state nếu value từ ngoài thay đổi
  React.useEffect(() => {
    if (value) setDate(value);
  }, [value]);

  // Hàm tạo list ngày trong khoảng from -> to
  function getDateList(from: Date | undefined, to: Date | undefined): Date[] {
    if (!from || !to) return [];
    const days = differenceInCalendarDays(to, from);
    const dates: Date[] = [];
    for (let i = 0; i <= days; i++) {
      dates.push(addDays(from, i));
    }
    return dates;
  }

  // Xử lý khi chọn ngày, có thể nhận undefined
  function handleSelect(range: DateRange | undefined) {
    if (!range) {
      setDate({ from: undefined, to: undefined });
      if (onChange) onChange([]);
      return;
    }
    setDate(range);
    const list = getDateList(range.from, range.to);
    if (onChange) onChange(list);
  }

  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !date.from && !date.to && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date.from ? (
              date.to ? (
                <>
                  {format(date.from, "PPP", { locale: vi })} -{" "}
                  {format(date.to, "PPP", { locale: vi })}
                </>
              ) : (
                format(date.from, "PPP", { locale: vi })
              )
            ) : (
              <span>Chọn khoảng ngày</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
            locale={vi}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
