"use client";

import { ReactNode, useMemo, useState } from "react";
import { HiArrowLongDown, HiMagnifyingGlass } from "react-icons/hi2";
import { cn } from "~/lib/utils";
import { ActivityIndicator } from "./activity-indicator";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Pagination } from "./ui/pagination";
import { Select } from "./ui/select";

type Id = string | number;
type Data<TCols extends string> = Record<TCols, {}> & { id: Id };

type Props<TData extends Data<TCols>, TCols extends string> = Readonly<{
  isLoading: boolean;
  data: TData[];
  cols: TCols[];
  customRender?: Partial<Record<TCols, (data: TData) => ReactNode>>;
  actions?: (data: TData) => ReactNode;
}>;

const pageSizeOptions = [6, 12, 20, 30, 50];

export function DataTable<TData extends Data<TCols>, TCols extends string>(
  props: Props<TData, TCols>,
) {
  const [pageSize, setPageSize] = useState(12);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<TCols>(props.cols[0] as TCols);

  const totalPages = Math.ceil(props.data.length / pageSize);

  const filteredData = useMemo(() => {
    return props.data.filter(row => {
      const values = Object.values(row).map(value => value.toString().toLowerCase());
      return values.some(value => value.includes(search.toLowerCase()));
    });
  }, [props.data, search]);

  const orderedData = useMemo(() => {
    return filteredData.toSorted((a, b) => {
      const valueA = a[orderBy].toString();
      const valueB = b[orderBy].toString();
      return order === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    });
  }, [filteredData, order, orderBy]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const slicedData: (TData | null)[] = orderedData.slice(start, start + pageSize);
    return slicedData.concat(
      Array.from({ length: pageSize - slicedData.length }).fill(null) as null[],
    );
  }, [orderedData, currentPage, pageSize]);

  function handlePageSizeChange(value: number) {
    setPageSize(value);
    setCurrentPage(1);
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full flex-col border-y bg-bg-white lg:rounded-xl lg:border-x">
        <div className="flex w-full flex-col justify-between gap-4 border-b border-border-light p-6 lg:flex-row">
          <div className="relative flex lg:grow">
            <Input
              className="w-full min-w-0 pl-9"
              placeholder="Pesquisar"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <HiMagnifyingGlass className="absolute left-3 top-3" size={16} />
          </div>
          <div className="flex items-center justify-end gap-2 lg:grow">
            {props.isLoading && <ActivityIndicator />}
            <p className="text-xs font-medium">Informações apresentadas por página:</p>
            <Select
              className="w-20"
              data={pageSizeOptions}
              dataValue={n => n.toString()}
              value={pageSize}
              onChange={handlePageSizeChange}
              render={n => <p className="font-semibold text-text-primary">{n}</p>}
            />
          </div>
        </div>
        <div className="w-full overflow-auto">
          <table className="w-full">
            <thead>
              <tr>
                {props.cols.map(col => (
                  <th key={col} className="overflow-auto p-0">
                    <Button
                      variant="ghost"
                      className="group flex w-full justify-start gap-2 rounded-none border-none"
                      onClick={() => {
                        if (orderBy === col) {
                          setOrder(order === "asc" ? "desc" : "asc");
                        } else {
                          setOrderBy(col as TCols);
                          setOrder("asc");
                        }
                      }}
                    >
                      <p
                        className={cn("truncate text-xs", {
                          "font-semibold text-text-accent": orderBy === col,
                          "font-medium text-text-tertiary": orderBy !== col,
                        })}
                      >
                        {col}
                      </p>
                      <HiArrowLongDown
                        className={cn("transform transition-transform", {
                          "rotate-180": orderBy === col && order === "desc",
                          "stroke-2 text-primary-normal": orderBy === col,
                        })}
                        size={16}
                      />
                    </Button>
                  </th>
                ))}
                {props.actions ? (
                  <th className="table-row-group overflow-auto p-0">
                    <p className="flex h-10 items-center truncate p-2 text-left text-xs font-medium text-text-tertiary">
                      Ações
                    </p>
                  </th>
                ) : null}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, i) => (
                <tr
                  key={row?.id ?? "empty_" + i}
                  className="h-14 border-t border-border-dark text-text-tertiary last:rounded-b-xl odd:bg-bg-active"
                >
                  {props.cols.map(col => (
                    <td
                      key={col}
                      className="max-w-48 overflow-auto truncate p-4"
                      title={row ? row[col as TCols].toString() : ""}
                    >
                      {row
                        ? (props.customRender?.[col]?.(row) ?? row[col as TCols].toString())
                        : null}
                    </td>
                  ))}
                  {props.actions ? (
                    <td className="px-2">{row && props.actions(row as TData)}</td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-end gap-4 px-4 lg:px-0">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
