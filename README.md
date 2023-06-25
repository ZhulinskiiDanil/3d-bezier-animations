# 3d-bezier-animations
3D model with custom bezier animation written in TypeScript

If you are open the file in directory "/src/entities/3dbomb/animation.ts", you can see this object:
```js
export const animation = {
  id: "1",
  settings: { ... },
  list: [ ... ]
}
```
This object is needed to move the `3dmodel`, you can also set the duration of the animation, delay, repetition, infinite repetition, etc.

### `animation.settings`
Settings are parent of the animation blocks
`timingFunction` support all css timing functions (ease, ease-in, ease-in-out, ...)
> 3d-bezier-animations apply date to duration and delay for accurate calculations
```js
settings: {
  duration: 1000, // milliseconds (default is 0)
  delay: 200, // milliseconds (default is 0)
  timingFunction: "ease", // Default value is cubic-bezier(.75, 0, .25, 1)
}
```

### `animation.list` Animation block's list
```js
list: [ // Animation block's
  { // Animation block
    name: "Rotation x", // Name of block
    fromTo: [0, 100], // Value that will change smoothly by timingFunction
    duration: 1000, // Default value is parent duration (settings.duration)
    delay: 200, // Default value is settings.delay
    timingFunction: "ease", // Default value is settings.timingFunction
    callback(mesh, value) { // This function will be called by requestAnimationFram every time until the duration ends.
      // `mesh: 3dmodel` is a 3dmodel from useEffect
      // `value: number` is a smoothly number from `fromTo[0]` to `fromTo[1]` by duration
      
      // timingFunction can also be linear, in which case there will be no smoothness
      mesh.rotation.x = value // Smoothly change value with timingFunction
    
    }
  }
]
```

### `settings.repeat`
`settings.repeat` is needed in order to loop the animation for a certain number of iterations,
animation in the example will repeat 5 times, if you had a delay on the animation, then it will
be applied only for the first iteration
```js
settings: {
  repeat: 5 // Repeat 5 times
}
```

### `repeatingWithDelay`
If you want a delay in every iteration, use `repeatingWithDelay`
```js
settings: {
  repeat: 5,
  repeatingWithDelay: true // Now each iteration uses a delay before starting a new iteration. (default is false)
}
```

### `repeatingDelay`
`repeatingDelay` will ignore the parent delay and each iteration will use `repeatingDelay` before starting a new one,
but this will only work if you include `repeatingWithDelay`
```js
settings: {
  repeat: 5,
  repeatingWithDelay: true, // Now each iteration uses a delay before starting a new iteration. (default is false)
  repeatingDelay: 200 // Only works with `repeatWithDelay: true`
}
```
