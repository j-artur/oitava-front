import { ReactNode } from "react";

type Props<TData, TCols extends string> = Readonly<{
  data: TData[];
  id: (data: TData) => string | number;
  render: Record<TCols, (data: TData) => ReactNode>;
}>;

export function Table<TData, TCols extends string>({
  data,
  id,
  render,
}: Props<TData, TCols>) {
  return (
    <table className="w-full">
      <thead>
        <tr>
          {Object.keys(render).map((col) => (
            <th key={col} className="px-4 py-2">
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={id(row)}>
            {Object.entries<(data: TData) => ReactNode>(render).map(
              ([col, fn]) => (
                <td key={col} className="px-4 py-2">
                  {fn(row)}
                </td>
              )
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
