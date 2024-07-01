export type GenericDataError = Record<string, string>;

export type DataResult<DataType> =
  | { data: DataType; errors: null }
  | { data: null; errors: GenericDataError };
