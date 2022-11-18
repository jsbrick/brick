import { Dispatch, SetStateAction, SyntheticEvent, useCallback, useRef, useState } from 'react';

import { Observable, Subject, tap } from 'rxjs';

import { useUnsubscribe } from './useUnsubscribe';

export function useEventHandler<
Event extends SyntheticEvent = SyntheticEvent,
Value = undefined,
>(
  fn: (
    obs: Observable<Event>,
    setState: Dispatch<SetStateAction<Value | undefined>>,
  ) => Observable<Value>,
  deps: unknown[] = [],
) {
  const subject$ = useRef(new Subject<Event>());
  const on = useCallback((event: Event) => subject$.current.next(event), []);
  const [state, setState] = useState<Value>();

  useUnsubscribe(
    fn(subject$.current.asObservable(), setState).pipe(tap(setState)),
    deps,
  );

  return [on, state, setState] as const;
}
