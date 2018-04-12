import {
  Vector3,
  DoubleSide,
  Geometry,
  Face3,
  Mesh,
  ShapeUtils,
  MeshNormalMaterial
} from 'three'

import {createScene} from '../scene_setup'

export default () => {
// Scene
  const scene = createScene()

  var geometry = new Geometry()
  geometry.vertices.push(new Vector3(0, 0, 0))
  geometry.vertices.push(new Vector3(0, 100, 0))
  geometry.vertices.push(new Vector3(100, 0, 0))

  // You cannot have two same vertices or the geom triangulation won't work
  geometry.vertices.push(new Vector3(0, 0, 100))
  geometry.vertices.push(new Vector3(100, 100, 0))

  // for (var i = 0; i < 10000; i++) {
  //   var vertex = new Vector3()
  //   vertex.x = Math.random() * 1000 - 500
  //   vertex.y = Math.random() * 1000 - 500
  //   vertex.z = Math.random() * 1000 - 500
  //   geometry.vertices.push(vertex)
  // }
  const triangles = ShapeUtils.triangulateShape(geometry.vertices, [])

  triangles.forEach(t => {
    geometry.faces.push(new Face3(t[0], t[1], t[2]))
  })
  // geometry.computeFaceNormals()
  // We need to compute the vertex normals for MeshNormalMaterial to work
  geometry.computeVertexNormals()

  // Double side to draw both sides of the face
  var object = new Mesh(geometry, new MeshNormalMaterial({side: DoubleSide}))
  scene.add(object)

// TO read
// What is a vertex normal and what relation has with face?
}
