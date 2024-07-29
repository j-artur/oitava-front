import type { Control, Path } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Error } from "~/components/error";
import { Select } from "~/components/ui/select";
import { cn } from "~/lib/utils";

type Props<TForm extends Record<string, unknown>, TData> = {
  control: Control<TForm>;
  name: Path<TForm>;
  label?: string;
  data: TData[];
  dataValue: (data: TData) => string | number;
  render: (data: TData) => React.ReactNode;
};

export function ControlledSelect<TForm extends Record<string, unknown>, TData>({
  control,
  name,
  label,
  data,
  dataValue,
  render,
}: Props<TForm, TData>) {
  return (
    <Controller
      control={control}
      name={name as Path<TForm>}
      render={({ field: { value, onChange, ...fieldProps }, fieldState }) => (
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
            <Select<TData>
              value={(value as TData) ?? (undefined as TData)}
              data={data}
              dataValue={dataValue}
              render={render}
              onChange={value => onChange(dataValue(value))}
              {...fieldProps}
            />
          </div>
          {fieldState.error && <Error>{fieldState.error.message}</Error>}
        </div>
      )}
    />
  );
}
