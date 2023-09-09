import type { Spec } from 'envalid'
import { makeValidator } from 'envalid'

export function arrStr<T extends string[] = string[]>(spec?: Spec<T>) {
  return makeValidator<T>((input) => {
    return (input?.split(',').map(s => s.trim()) as T) || []
  })(spec)
}

export function arrNum<T extends number[] = number[]>(spec?: Spec<T>) {
  return makeValidator<T>((input) => {
    return (input?.split(',').map(s => Number(s)) as T) || []
  })(spec)
}

export function arrBool<T extends boolean[] = boolean[]>(spec?: Spec<T>) {
  return makeValidator<T>((input) => {
    return (input?.split(',').map(s => Boolean(s)) as T) || []
  })(spec)
}
