export type Option = {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
};

export interface DataTableFilterOption<TData> {
  id?: string;
  label: string;
  value: keyof TData | string;
  items: Option[];
  isMulti?: boolean;
}

export interface DataTableSearchableColumn<TData> {
  id: keyof TData;
  title: string;
}

export type DataTableFilterableColumn<TData> = (
  | {
      type: "default";
      options: Option[];
    }
  | { type: "date" }
) &
  DataTableSearchableColumn<TData>;
