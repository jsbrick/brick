import { map, Observable } from 'rxjs';
import { Either, isLeft } from 'fp-ts/Either';

export const uneitherify = <Err, Value>() =>
  (observer: Observable<Either<Err, Value>>) =>
    observer.pipe(
      map((value) => {
        if (isLeft(value)) {
          // eslint-disable-next-line @typescript-eslint/no-throw-literal
          throw value.left;
        }
        return value.right;
      }),
    );
