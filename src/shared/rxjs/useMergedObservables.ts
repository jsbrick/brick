import { useState } from 'react';

import { from, map, merge, ObservableInputTuple } from 'rxjs';

import { useUnsubscribe } from './useUnsubscribe';

export const useMergedObservables = <T extends readonly (unknown | null)[]>(
  observables: readonly [...ObservableInputTuple<T>],
  defaultValues?: T,
  deps: unknown[] = [],
) => {
  const [data, setData] = useState<T>(
    new Array(observables.length)
      .fill(null)
      .map((_, index) => defaultValues?.[index] ?? null) as unknown as T,
  );

  useUnsubscribe(merge(
    ...observables.map((observable, index) => from(observable).pipe(
      map((a) => [a, index] as const),
    )),
  ).pipe(
    map(([value, index]) => setData(
      (oldData) => [
        ...oldData.slice(0, index),
        value,
        ...oldData.slice(index + 1),
      ] as unknown as T,
    )),
  ), deps);

  return data;
};
