import { of, pipe } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BrickError, createErrorsMap, isBrickError } from 'shared/errors';

import { fragmentToHtml } from '../../utils';

const SelectionErrors = createErrorsMap('unsupported', 'unknownSelection', 'zeroRange');

export const getSelection$ = () => (
  typeof window !== 'undefined' && typeof window.getSelection === 'function'
    ? of(window.getSelection())
    : BrickError.throw('Cannot get the selection.', SelectionErrors.unsupported)
);

const checkSelection = pipe(
  (selection: unknown): Selection => (
    selection instanceof Selection
      ? selection : BrickError.throw('Selection required argument.', SelectionErrors.unknownSelection)
  ),
  (selection): Selection => (
    selection.rangeCount > 0
      ? selection
      : BrickError.throw('rangeCount is 0.', SelectionErrors.zeroRange)
  ),
);

export const cloneSelection = pipe(
  checkSelection,
  (selection: Selection) => selection.getRangeAt(0),
  (range) => range.cloneContents(),
);

export const cloneHtmlSelection$ = () => getSelection$().pipe(
  map(cloneSelection),
  map(fragmentToHtml),
  catchError((error) => {
    if (isBrickError(error) && error.code === SelectionErrors.zeroRange) {
      return of('');
    }
    throw error;
  }),
);
