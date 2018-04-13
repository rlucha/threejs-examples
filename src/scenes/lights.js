import {
  Vector3,
  DoubleSide,
  Geometry,
  Face3,
  Mesh,
  ShapeUtils,
  MeshNormalMaterial,
  SphereGeometry,
  MeshBasicMaterial,
  PointLight,
  BackSide,
  BoxGeometry,
  MeshPhongMaterial
} from 'three'

import {createScene, addAnimationCB} from '../scene_setup'

const createLight = () => {
  const color = 0xffffff
  const intensity = 0.4

  var pointLight = new PointLight(color, intensity, 50)
  pointLight.castShadow = true
  pointLight.shadow.camera.near = 1
  pointLight.shadow.camera.far = 60
  pointLight.shadow.bias = -0.005 // reduces self-shadowing on double-sided objects

  // helper to position the light
  var geometry = new SphereGeometry(1, 12, 12)
  var material = new MeshBasicMaterial({ color: color })
  material.color.multiplyScalar(1)
  var sphere = new Mesh(geometry, material)
  pointLight.add(sphere)
  return pointLight
}

export default () => {
// Scene
  const scene = createScene()

  const pl = createLight(scene)
  const p2 = createLight(scene)
  scene.add(pl)
  scene.add(p2)

  var geometry2 = new BoxGeometry(30, 30, 30)
  var material2 = new MeshPhongMaterial({
    color: 0xff0000,
    shininess: 10,
    specular: 0x111111,
    side: BackSide
  })

  var cubeG = new BoxGeometry(2, 2, 2)
  var cubeM = new MeshPhongMaterial({
    color: 0x330000,
    shininess: 10,
    specular: 0x111111
  })
  var cubeMesh = new Mesh(cubeG, cubeM)
  cubeMesh.castShadow = true

  cubeMesh.position.set(-10, -4, 0)

  scene.add(cubeMesh)

  var room = new Mesh(geometry2, material2)
  room.position.y = 10
  room.receiveShadow = true
  scene.add(room)

  addAnimationCB(function (cTime) {
    const speed = 0.001
    const amplitude = 10
    const a = (Math.cos(cTime * speed) * amplitude) + 10
    pl.position.set(0, a, 0)
    p2.position.set((a * 0.5), 0, a*0.5)
  })
// TO read
// What is a vertex normal and what relation has with face?
}
