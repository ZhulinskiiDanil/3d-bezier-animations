import { timingFunctions } from "./timingFunctions"

// Types
import { TimingFunctionType } from "./timingFunctions"

export interface IScope {
  fullfiled: boolean
  msLeft: number
  msLeftInPercent: number
}

export interface IGetSmoothValueSettings {
  fromTo: number[]
  delay?: number
  repeatingDelay?: number
  duration?: number
  repeat?: number
  timingFunction?: TimingFunctionType
  paused?: boolean
  infinity?: boolean
  repeatingWithDelay?: boolean
}

export interface IGetSmoothValueCallbackProps {
  value: number
}

export type IGetSmoothValueCallback = ({ value }:
  IGetSmoothValueCallbackProps) => void

export interface IGetSmoothValueReturn {
  stopCalculate(): void
}

export function getSmoothValue(cb: IGetSmoothValueCallback, {
  // Numbers
  fromTo,
  delay = 0,
  repeatingDelay = 0,
  duration = 0,
  repeat = 0,

  // Custom Types
  timingFunction,

  // Boolean
  paused,
  infinity,
  repeatingWithDelay,
}: IGetSmoothValueSettings): IGetSmoothValueReturn {
  const [from, to] = fromTo
  const Bezier = timingFunctions[timingFunction || "ease"]
  interface IData {
    date: Date | number | null
    rAF: null | number
    iterations: number
  }

  const data: IData = {
    date: null,
    rAF: null,
    iterations: 1
  }

  if (!data.date && !paused) {
    data.date = new Date()
    start()
  }

  function start() {
    const scope: IScope = {
      fullfiled: false,
      msLeft: 0,
      msLeftInPercent: 0
    }

    function loop() {
      callback(scope)
      
      if (!scope.fullfiled) {
        data.rAF = requestAnimationFrame(loop)
      }
    }

    data.rAF = requestAnimationFrame(loop)
  }

  function callback(scope: IScope) {
    const date = data.date ? +data.date : 0
    const msLeft = +new Date() - +date - delay
    const msLeftInPercent = 100 * (msLeft / duration)
    
    scope.msLeft = msLeft
    scope.msLeftInPercent = msLeftInPercent

    function restoreAnimation() {
      const withRepeatingDelay = repeatingDelay ?
        (delay || 0) - (repeatingDelay || 0) : 0
      const decrementedDelay = !repeatingWithDelay ?
        (delay || 0) : 0 + withRepeatingDelay

      data.date = +new Date() - decrementedDelay + (msLeft - duration)
      data.iterations++
    }

    if (msLeftInPercent > 0 && msLeftInPercent < 100) {
      cb({
        value: valueFromRange(
          from, to, Bezier(msLeftInPercent / 100)
        ),
        ...scope
      })
    } else if (msLeftInPercent > 0 && msLeftInPercent >= 100 && !scope.fullfiled) {
      if (typeof repeat === "number" && repeat > 0 && data.iterations < repeat) {
        restoreAnimation()
      } else if (infinity) {
        restoreAnimation()
      } else {
        scope.fullfiled = true
      }
      
      cb({
        value: to,
        ...scope
      })
    }
  }

  function valueFromRange(from: number, to: number, unit: number): number {
    const inverse = from > to
    const parsedUnit = inverse ? unit : 1 - unit
    const min = from > to ? from : to
    const max = min === to ? from : to
    
    const result: number = (max - min) * parsedUnit + min
    
    return Math.ceil(result * 1000) / 1000
  }

  function stopCalculate(): void {
    if (data.rAF) {
      cancelAnimationFrame(data.rAF)
    }
  }

  return { stopCalculate }
}