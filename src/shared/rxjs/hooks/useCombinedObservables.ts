import { useState } from 'react';

import { combineLatest, ObservableInputTuple, tap } from 'rxjs';

import { useUnsubscribe } from './useUnsubscribe';

export const useCombinedObservables = <T extends readonly unknown[]>(
  observables: readonly [...ObservableInputTuple<T>],
  defaultValues: T,
  deps: unknown[] = [],
) => {
  const [data, setData] = useState<T>(
    new Array(observables.length)
      .fill(null)
      .map((_, index) => defaultValues?.[index] ?? null) as unknown as T,
  );

  useUnsubscribe(combineLatest(observables).pipe(tap(setData)), deps);

  return data;
};
