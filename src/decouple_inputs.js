import { curry, forEachObjIndexed } from 'ramda'

//  State ----------------
const panelContainer = document.createElement('div')
const element01Container = document.createElement('div')
const timeHooks = {}
const behaviours = {}
window.behaviours = behaviours
// -----------------------

// State Utils -----------
const addTimeHook = (id, fn) => { timeHooks[id] = {value: 0, fn} }
const addBehaviour = (id, thID, fn) => {
  behaviours[id] = () => fn(timeHooks[thID].value)
}
// -----------------------

// loop gets a timestamp passed as requestAnimationFrame default param
const loop = (t = 0) => {
  // Execute all timeHooks
  forEachObjIndexed((th, key, obj) => {
    obj[key]['value'] = th.fn(t)
  }, timeHooks)

  forEachObjIndexed((bh, key, obj) => bh(), behaviours)

  panelContainer.innerHTML = timeHooksPanel(timeHooks)
  window.requestAnimationFrame(loop)
}

const tSpeed = (t, sp) => t * sp
const COSLoop = t => Math.cos(t)

// movGenerator :: speed -> transformFn -> time -> Number
// curry this functions so you can pass them as CB to addTimeHook
const movGenerator = (speed, tFn, t) => {
  return tFn(tSpeed(t, speed))
}

const timeHooksPanel = timeHooks => `
  <div>
    <strong>TD1</strong>
    <span>${timeHooks.td1.value}</span>
    <hr/>
  </div>`

const element01 = val => `
<div>
  <div style="position: relative; left: ${val}px">
    <strong>element01: ${val}px</strong>
  </div>
  <hr/>
</div>`

// movBehaviour1 maps from a timehookvalue to a element property
// const movBehaviour1 = (el, timehookID_ref) => {

// }

// // mock el
// const el = {
//   x: 0,
//   y: 0
// }

// Setup ------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  document.body.append(panelContainer)
  document.body.append(element01Container)
})

// create timeBoundFunctions with unbound t
const td1 = curry(movGenerator)(0.001, COSLoop)

// timehook are functions from t -> any
addTimeHook('td1', td1)

addBehaviour('bh1', 'td1', val => {
  element01Container.innerHTML = element01(val * 100)
})

// addElementBehaviour()
// -----------------------
export { loop }
