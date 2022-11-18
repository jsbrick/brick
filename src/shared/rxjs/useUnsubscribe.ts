import { useEffect } from 'react';

import { Observable } from 'rxjs';

export const useUnsubscribe = <T>(obs$: Observable<T>, deps: unknown[] = []) => {
  useEffect(() => {
    const unsubscriber = obs$.subscribe();

    return () => unsubscriber.unsubscribe();
  }, [...deps]);
};
