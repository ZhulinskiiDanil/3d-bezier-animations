import { IGetSmoothValueSettings } from "./getSmoothValue"
import { TimingFunctionType } from "./getSmoothValue/timingFunctions"

interface IAnimationSettings {
  duration?: number
  delay?: number
  timingFunction?: TimingFunctionType
}

interface IAnimationListItem extends IGetSmoothValueSettings {
  name: string
  callback(mesh: any, value: number): void
}

type IAnimationList = IAnimationListItem[]

interface IAnimation {
  id: string | number
  settings: IAnimationSettings
  list: IAnimationList
}

const DURATION: number  = 2000,
      DELAY:    number  = 1000

export const animation: IAnimation = {
  id: "1",
  settings: {
    duration: DURATION,
    delay: DELAY,
    timingFunction: "default"
  },
  list: [
    {
      name: "POSITION_Y",
      fromTo: [-8, 0],
      duration: DURATION / 2,
      timingFunction: "ease",
      callback(mesh, value) {
        mesh.position.y = value
      }
    },
    {
      name: "POSITION_Z",
      fromTo: [-2, -6],
      callback(mesh, value) {
        mesh.position.z = value
      }
    },
    {
      name: "ROTATION_X",
      fromTo: [.8, 0],
      callback(mesh, value) {
        mesh.rotation.x = value
      } 
    },
    {
      name: "ROTATION_Y",
      fromTo: [-.5, .4],
      callback(mesh, value) {
        mesh.rotation.y = value
      }
    },
    {
      name: "ROTATION_Y",
      fromTo: [.4, Math.PI * 2 + .4],
      duration: 3000,
      delay: DURATION + DELAY,
      repeat: 2,
      timingFunction: "ease",
      callback(mesh, value) {
        mesh.rotation.y = value
      }
    }
  ]
}