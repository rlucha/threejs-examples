import { curry, forEachObjIndexed } from 'ramda'

//  State ----------------
const timeHooks = {}
window.timeHooks = timeHooks
// -----------------------

// State Utils -----------
const addTimeHook = (id, fn) => { timeHooks[id] = {value: 0, fn} }
// const addElementBehaviour = (fn, thList) => timeHooks.push(fn)
// -----------------------

// loop gets a timestamp passed as requestAnimationFrame default param
const loop = (t = 0) => {
  // Execute all timeHooks
  forEachObjIndexed((th, key, obj) => {
    obj[key]['value'] = th.fn(t)
  }, timeHooks)

  window.requestAnimationFrame(loop)
}

const tSpeed = (t, sp) => t * sp
const COSLoop = t => Math.cos(t)

// movGenerator :: speed -> transformFn -> time -> Number
// curry this functions so you can pass them as CB to addTimeHook
const movGenerator = (speed, tFn, t) => {
  return tFn(tSpeed(t, speed))
}

// movBehaviour1 maps from a timehookvalue to a element property
// const movBehaviour1 = (el, timehookID_ref) => {

// }

// // mock el
// const el = {
//   x: 0,
//   y: 0
// }

// Setup ------------------------------------

// create timeBoundFunctions with unbound t
const td1 = curry(movGenerator)(0.001, COSLoop)

// timehook are functions from t -> any
addTimeHook('td1', td1)

// addElementBehaviour()
// -----------------------
export { loop }
