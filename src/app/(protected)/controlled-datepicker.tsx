import type { ComponentProps } from "react";
import type { Control, Path } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Error } from "~/components/error";
import { cn } from "~/lib/utils";
import { DatePicker } from "./date-picker";

type Props<TForm extends Record<string, unknown>> = ComponentProps<"input"> & {
  control: Control<TForm>;
  name: Path<TForm>;
  label?: string;
  mode: "near" | "far";
};

export function ControlledDatePicker<TForm extends Record<string, unknown>>({
  control,
  name,
  label,
  value,
  ...inputProps
}: Props<TForm>) {
  return (
    <Controller
      control={control}
      name={name as Path<TForm>}
      render={({ field: { value, ...fieldProps }, fieldState }) => (
        <div className="flex flex-col gap-1">
          <div className="relative">
            {label && (
              <label
                className={cn(
                  "pointer-events-none absolute left-1 top-2 origin-[0] -translate-y-4 scale-75 transform cursor-text whitespace-nowrap rounded-full bg-inherit bg-white px-2 font-medium leading-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus-visible:top-1.5 peer-focus-visible:-translate-y-4 peer-focus-visible:scale-75 peer-focus-visible:px-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                  {
                    "text-destructive-text": fieldState.error,
                    "text-text-accent": !fieldState.error,
                  },
                )}
              >
                {label}
              </label>
            )}
            <DatePicker value={value as Date} {...inputProps} {...fieldProps} />
          </div>
          {fieldState.error && <Error>{fieldState.error.message}</Error>}
        </div>
      )}
    />
  );
}
