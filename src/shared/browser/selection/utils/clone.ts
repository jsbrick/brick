import { iif, of, pipe, throwError } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { fragmentToHtml } from 'shared/browser';
import { truthy } from 'shared/utils';

export const getSelection$ = () => iif(
  () => typeof window !== 'undefined' && typeof window.getSelection === 'function',
  of(window.getSelection()),
  throwError(() => new Error('Cannot get the selection.')),
);

export const cloneSelection = pipe(
  filter<Selection | null | undefined, Selection>(truthy),
  filter((selection) => selection.rangeCount > 0),
  map((selection) => selection.getRangeAt(0)),
  map((range) => range?.cloneContents() ?? ''),
);

export const cloneHtmlSelection$ = () => getSelection$().pipe(
  cloneSelection,
  filter(truthy),
  map(fragmentToHtml),
);
