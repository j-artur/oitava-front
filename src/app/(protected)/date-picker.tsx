"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";

import { ptBR } from "date-fns/locale";
import { cn } from "~/lib/utils";
import { Calendar } from "../../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";

type Props = {
  value: Date | null;
  onChange: (date: Date | null) => void;
  onBlur?: () => void;
  mode: "near" | "far";
};

export const DatePicker: React.FC<Props> = props => {
  const year = new Date().getFullYear();

  return (
    <Popover
      onOpenChange={open => {
        if (!open) props.onBlur?.();
      }}
    >
      <PopoverTrigger asChild>
        <button
          className={cn(
            "flex h-10 w-full min-w-0 items-center rounded-md border border-border-dark bg-white px-3 py-2 text-sm text-text-accent ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-darker focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            !props.value && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-text-label" />
          {props.value ? (
            format(props.value, "PPP", { locale: ptBR })
          ) : (
            <span className="text-text-label">Selecione uma data</span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          captionLayout={props.mode === "near" ? "buttons" : "dropdown"}
          fromYear={year - 100}
          toYear={year + 100}
          mode="single"
          selected={props.value ?? undefined}
          onSelect={d => props.onChange(d ?? null)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
