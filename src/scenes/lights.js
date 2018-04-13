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

export default () => {
// Scene
  const scene = createScene()
  const color = 0xffffff
  const intensity = 1

  var pointLight = new PointLight(color, intensity, 50)
  pointLight.castShadow = true
  pointLight.shadow.camera.near = 1
  pointLight.shadow.camera.far = 60
  pointLight.shadow.bias = -0.005 // reduces self-shadowing on double-sided objects

  // helper to position the light
  var geometry = new SphereGeometry(1, 12, 12)
  var material = new MeshBasicMaterial({ color: color })
  material.color.multiplyScalar(intensity)
  var sphere = new Mesh(geometry, material)
  pointLight.add(sphere)

  var geometry2 = new BoxGeometry(30, 30, 30)
  var material2 = new MeshPhongMaterial({
    color: 0xff0000,
    shininess: 10,
    specular: 0x111111,
    side: BackSide
  })

  var mesh = new Mesh(geometry2, material2)
  mesh.position.y = 10
  mesh.receiveShadow = true
  scene.add(mesh)
  scene.add(pointLight)

  addAnimationCB(function (cTime) {
    const a = (Math.cos(cTime * 0.001) * 10) + 10
    console.log(cTime * 0.01)

    console.log(a, pointLight.position)
    pointLight.position.set(0, a, 0)
  })
// TO read
// What is a vertex normal and what relation has with face?
}
