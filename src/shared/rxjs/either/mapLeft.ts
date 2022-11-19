import { Either, isLeft } from 'fp-ts/Either';
import { map } from 'rxjs/operators';

export const mapLeft = <Err, Value, Result>(
  fn: (arg: Err) => Either<Result, Value>,
) =>
    map((arg: Either<Err, Value>) => {
      if (isLeft(arg)) {
        return fn(arg.left);
      }
      return arg;
    });
