import type { ComponentProps, ReactNode } from "react";
import type { Control, Path } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Error } from "~/components/error";
import { cn } from "~/lib/utils";
import { Input } from "./input";

type ControlSubset<TRecord, TType> = {
  [TKey in keyof TRecord as TRecord[TKey] extends TType ? TKey : never]: TRecord[TKey];
};

type Props<TForm extends Record<string, unknown>> = ComponentProps<"input"> & {
  control: Control<TForm>;
  name: Path<ControlSubset<TForm, string>>;
  label?: string;
  mask?: (value: string) => string;
  icon?: ReactNode;
};

export function ControlledInput<TForm extends Record<string, unknown>>({
  control,
  name,
  label,
  mask,
  icon,
  ...inputProps
}: Props<TForm>) {
  return (
    <Controller
      control={control}
      name={name as Path<TForm>}
      render={({ field: { onChange, value, ...fieldProps }, fieldState }) => (
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
            <Input
              id={name}
              value={value as string}
              onChange={mask ? e => onChange(mask(e.target.value)) : e => onChange(e.target.value)}
              {...inputProps}
              {...fieldProps}
            />
            {icon}
          </div>
          {fieldState.error && <Error>{fieldState.error.message}</Error>}
        </div>
      )}
    />
  );
}
