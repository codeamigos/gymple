import * as t from 'io-ts'
import * as _ from 'lodash'

export const shouldNeverHappen = (_: never): never => {
  throw new Error('Should never happen!')
}

export function decode<T>(value: any, type: t.Type<T>): Promise<T> {
  const validation = t.validate(value, type)
  return validation.fold(
    ([e, ..._unused]) => {
      const actualErr = _.last(e.context)
      const errPath = e.context
        .map(c => c.key)
        .filter(key => key.length)
        .join('.')

      const actualValue = JSON.stringify(_.get(value, errPath))
      const typeOf = (typedValue: any) => (_.isArray(typedValue) ? 'array' : typeof typedValue)

      const error = new Error(
        `[data].${errPath} expected ${actualErr ? actualErr.type.name : 'something'}, but got ${typeOf(
          actualValue
        )} (${actualValue})`
      )
      return Promise.reject(error)
    },
    validatedValue => Promise.resolve(validatedValue)
  )
}

export const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export function randomInteger(min: number, max: number) {
  var rand = min + Math.random() * (max + 1 - min)
  rand = Math.floor(rand)
  return rand
}

export function secondsToMinutes(seconds: number, format: 'mm:ss' | 'm s' = 'mm:ss') {
  const min = String(Math.floor(seconds / 60))
  const sec = String(seconds % 60)

  if (format === 'mm:ss') {
    const ss = sec.length < 2 ? '0' + sec : sec
    const mm = min.length < 2 ? '0' + min : min
    return mm + ':' + ss
  }

  return (min !== '0' ? min + 'm ' : '') + (sec !== '0' ? sec + 's' : '')
}
