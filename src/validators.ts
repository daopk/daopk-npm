import { makeValidator, Spec } from "envalid";

export function arrStr(spec?: Spec<string[]>) {
  return makeValidator((input) => {
    return input?.split(",").map((s) => s.trim()) || [];
  })(spec);
}

export function arrNum(spec?: Spec<number[]>) {
  return makeValidator((input) => {
    return input?.split(",").map((s) => Number(s)) || [];
  })(spec);
}
