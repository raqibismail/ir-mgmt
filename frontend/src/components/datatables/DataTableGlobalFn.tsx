import { Row } from "@tanstack/react-table";

export default function GlobalFilterFn<TData extends Record<string, unknown>>(
  row: Row<TData>,
  columnId: string,
  filterValue: string
) {
  if (!filterValue) return true;

  const searchTerms = filterValue.toLowerCase().split(" ").filter(Boolean);

  return searchTerms.every((term) =>
    Object.values(row.original).some((value) => {
      if (value == null) return false;
      return String(value).toLowerCase().includes(term);
    })
  );
}
