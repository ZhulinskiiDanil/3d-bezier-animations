import { bezier } from "./bezier"

export type TimingFunctionType = (undefined | false | null)
  | "linear" | "ease" | "ease-in"
  | "ease-out" | "ease-in-out"
  | "default"

export const timingFunctions = {
  "default": bezier(.75, 0, .25, 1),
  "linear": bezier(0, 0, 1, 1),
  "ease": bezier(.25, .1, .25, 1),
  "ease-in": bezier(.42, 0, 1, 1),
  "ease-out": bezier(0, 0, .58, 1),
  "ease-in-out": bezier(.42, 0, .58, 1)
}
