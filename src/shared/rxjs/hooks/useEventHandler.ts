import { Dispatch, SetStateAction, SyntheticEvent, useCallback, useRef, useState } from 'react';

import { catchError, Observable, retry, Subject, tap } from 'rxjs';

import { useUnsubscribe } from './useUnsubscribe';

export function useEventHandler<
Event extends SyntheticEvent = SyntheticEvent,
Value = unknown,
>(
  fn: (
    obs: Observable<Event>,
    setState: Dispatch<SetStateAction<Value | undefined | null>>,
  ) => Observable<Value | null | undefined>,
  deps: unknown[] = [],
) {
  const subject$ = useRef(new Subject<Event>());
  const on = useCallback((event: Event) => subject$.current.next(event), []);
  const [state, setState] = useState<Value | null>();

  useUnsubscribe(
    fn(subject$.current.asObservable(), setState).pipe(
      tap(setState),
      catchError((error) => {
        // eslint-disable-next-line no-console
        console.error('Unhandled error inside the "on" handler.', error);

        throw error;
      }),
      retry(),
    ),
    deps,
  );

  return [on, state, setState] as const;
}
