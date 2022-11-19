import { left, right } from 'fp-ts/Either';
import { of, pipe } from 'rxjs';

import { fragmentToHtml } from 'shared/browser';
import { mapRight } from 'shared/rxjs/either';

export const getSelection$ = () => of(
  typeof window !== 'undefined' && typeof window.getSelection === 'function'
    ? right(window.getSelection())
    : left(new Error('Cannot get the selection.')),
);

export const cloneSelection = pipe(
  mapRight((selection: Selection | null | undefined) => (selection
    ? right(selection)
    : left(new Error('Selection is undefined.')))),
  mapRight((selection) => (selection.rangeCount > 0
    ? right(selection)
    : left(new Error('rangeCount is 0.')))),
  mapRight((selection) => right(selection.getRangeAt(0))),
  mapRight((range) => right(range?.cloneContents() ?? '')),
  mapRight((fragment) => (!fragment
    ? left(new Error('Cannot cloneContents in range.'))
    : right(fragment))),
);

export const cloneHtmlSelection$ = () => getSelection$().pipe(
  cloneSelection,
  mapRight((fragment) => right(fragmentToHtml(fragment))),
);
