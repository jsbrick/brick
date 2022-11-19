import { Either, isRight } from 'fp-ts/Either';
import { tap } from 'rxjs/operators';

export const tapRight = <Err, Value>(fn: (arg: Value) => void) =>
  tap((arg: Either<Err, Value>) => {
    if (isRight(arg)) {
      fn(arg.right);
    }
  });
