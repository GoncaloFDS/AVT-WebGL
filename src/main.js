import loader from "./loader.js";

let scene = new THREE.Scene()
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
let renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

camera.position.z = 20

let controls = new THREE.OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.campingFactor = 0.25
controls.enableZoom = true

let dirLight = new THREE.DirectionalLight()
dirLight.position.set(150, 150, -150)
//dirLight.castShadow = true
scene.add(dirLight)

let objects = []

objects.push(loader.loadObject("../models/Lamborginhi/Body.mtl", "../models/Lamborginhi/Body.obj"))
objects.push(loader.loadObject("../models/table/table.mtl", "../models/table/table.obj"))

for (let i = 0; i < objects.length; i++) {
    scene.add(objects[i])
}


function loop() {
    requestAnimationFrame(loop)
    controls.update()
    renderer.render(scene, camera)
}

loop()