import { catchError, map, Observable, of } from 'rxjs';
import { Either, left, right } from 'fp-ts/Either';

export const eitherify = <Err, Value>() =>
  (observer: Observable<Value>): Observable<Either<Err, Value>> =>
    observer.pipe(
      map((value: Value) => right(value)),
      catchError((error: Err) => of(left(error))),
    );
