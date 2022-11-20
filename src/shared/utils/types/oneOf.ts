export type OneOf<T extends ReadonlyArray<unknown>> =
  T extends ReadonlyArray<infer K> ? K : never;
