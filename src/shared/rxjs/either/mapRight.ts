import { Either, isRight } from 'fp-ts/Either';
import { map } from 'rxjs/operators';

export const mapRight = <Value = never, ErrorResult = never, ValueResult = never>(
  fn: (value: Value) => Either<ErrorResult, ValueResult>,
) =>
    map((arg: Either<unknown, Value>) => {
      if (isRight(arg)) {
        return fn(arg.right);
      }
      return arg;
    });
