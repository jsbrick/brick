import { useState } from 'react';

import { from, map, ObservableInput } from 'rxjs';

import { useUnsubscribe } from './useUnsubscribe';

export function useObservable<T>(observable$: ObservableInput<T>): T | undefined;
export function useObservable<T>(observable$: ObservableInput<T>, defaultValue: T): T;

export function useObservable<T>(observable: ObservableInput<T>, defaultValue?: T) {
  const [data, setData] = useState<T | undefined>(defaultValue);

  useUnsubscribe(from(observable).pipe(
    map((value) => setData(value)),
  ));

  return data;
}
