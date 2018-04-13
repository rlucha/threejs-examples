import {
  Scene,
  WebGLRenderer,
  AmbientLight,
  AxesHelper,
  PerspectiveCamera
} from 'three'

import OrbitControls from 'orbit-controls-es6'

const animationObservers = []

export const addAnimationCB = cb => animationObservers.push(cb)

const createScene = () => {
  const scene = new Scene()
  window.scene = scene

  // Renderer
  const renderer = new WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMapEnabled = true

  const ambientLight = new AmbientLight(0x404040)
  scene.add(ambientLight)

  // Axis helper
  const axesHelper = new AxesHelper(100)
  scene.add(axesHelper)

  // Camera
  const camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000)
  camera.position.set(5, 12, 22)
  camera.lookAt(0, 0, 0)

  window.camera = camera
  // var vector = camera.position.clone();

  // Controls
  // const controls = new OrbitControls(camera)
  // controls.enableZoom = true;
  // controls.enabled = false;
  // controls.autoRotate = true;

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enabled = true
  controls.maxDistance = 1500
  controls.minDistance = 0

  // Attach canvas canvas
  document.body.appendChild(renderer.domElement)

  const timeStamp = Date.now()
  function animate () {
    var cTime = Date.now() - timeStamp
    window.requestAnimationFrame(animate)
    // controls.update();
    renderer.render(scene, camera)

    animationObservers.forEach(cb => cb(cTime))
  }

  animate()

  return scene
}

export {createScene}
