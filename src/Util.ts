import * as t from 'io-ts';
import * as _ from 'lodash';

export const shouldNeverHappen = (_: never): never => {throw new Error('Should never happen!'); };

export function decode<T>(value: any, type: t.Type<T>): Promise<T> {
  const validation = t.validate(value, type);
  return validation.fold(
    ([e, ..._unused]) => {
      const actualErr = _.last(e.context);
      const errPath = e.context
        .map(c => c.key)
        .filter(key => key.length)
        .join('.');

      const actualValue = JSON.stringify(_.get(value, errPath));
      const typeOf = (typedValue: any) =>
        _.isArray(typedValue) ? 'array' : typeof typedValue;

      const error = new Error(`[data].${errPath} expected ${actualErr ? actualErr.type.name : 'something'}, but got ${typeOf(actualValue)} (${actualValue})`);
      return Promise.reject(error);
    },
    validatedValue => Promise.resolve(validatedValue),
  );
}

