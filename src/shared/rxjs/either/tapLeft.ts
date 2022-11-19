import { Either, isLeft } from 'fp-ts/Either';
import { tap } from 'rxjs/operators';

export const tapLeft = <Err, Value>(fn: (arg: Err) => void) =>
  tap((arg: Either<Err, Value>) => {
    if (isLeft(arg)) {
      fn(arg.left);
    }
  });
