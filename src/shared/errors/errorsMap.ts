import { OneOf } from 'shared/utils';

export const createErrorsMap = <T extends ReadonlyArray<string>>(...codes: T) =>
  codes.reduce((acc, code) => ({
    ...acc,
    [code]: code,
  }), {}) as Readonly<{ [k in OneOf<T>]: k }>;
