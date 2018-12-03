import loader from "./loader.js";

//Scene
let scene = new THREE.Scene()

//Camera
let followCamera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000)
followCamera.position.set(50, 50, 50)
const orthoCamera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 0.1, 1000)
orthoCamera.position.set(0, 130, 0)
const topCamera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 0.1, 1000)
topCamera.position.set(0, 800, 0)

//Renderer
let renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.gammaOutput = true
document.body.appendChild(renderer.domElement)

//Camera Controls
let controls = new THREE.OrbitControls(followCamera, renderer.domElement)
controls.enableDamping = true
controls.campingFactor = 0.25
controls.enableZoom = true

//Light
let dirLight = new THREE.DirectionalLight(0xffffff, 0.0)
dirLight.position.set(150, 150, -150)
// dirLight.castShadow = true
// dirLight.shadow = new THREE.LightShadow(followCamera)
// dirLight.shadow.bias = 0.0001
// dirLight.shadow.mapSize.height = 1024
// dirLight.shadow.mapSize.width = 1024
scene.add(dirLight)

let ambLight = new THREE.AmbientLight(0xffffff, 0.0)
ambLight.position.set(200, 200, 200)
scene.add(ambLight)

let spotLightR = new THREE.SpotLight(0xffffff, 0.8)
spotLightR.decay = 2
spotLightR.penumbra = 0.45
//spotLightR.castShadow = true
spotLightR.position.set(60, 50, 200)
spotLightR.target = new THREE.Object3D()
spotLightR.target.position.set(80, 50, 50000)
spotLightR.target.updateMatrixWorld()
spotLightR.add(spotLightR.target)

let spotLightL = new THREE.SpotLight(0xffffff, 0.8)
spotLightL.decay = 2
spotLightL.penumbra = 0.45
//spotLightL.castShadow = true
spotLightL.position.set(-60, 50, 200)
spotLightL.target = new THREE.Object3D()
spotLightL.target.position.set(-80, 50, 50000)
spotLightL.target.updateMatrixWorld()
spotLightL.add(spotLightL.target)

console.log(spotLightL.target.position.x + " " + spotLightL.target.position.y + " " + spotLightL.target.position.z)


//Objects
let car = loader.loadObject("../models/Lamborginhi/Body.mtl", "../models/Lamborginhi/Body.obj")
let wheels = []
wheels.push(loader.loadObject("../models/Lamborginhi/Wheel.mtl", "../models/Lamborginhi/Wheel.obj"))
wheels[0].name = "WheelRF"
wheels[0].position.set(-85.429, 34.599, 128.173)
wheels[0].rotation.y = Math.PI
car.add(wheels[0])
wheels.push(loader.loadObject("../models/Lamborginhi/Wheel.mtl", "../models/Lamborginhi/Wheel.obj"))
wheels[1].name = "WheelLF"
wheels[1].position.set(85.429, 34.599, 128.173)
car.add(wheels[1])
wheels.push(loader.loadObject("../models/Lamborginhi/Wheel.mtl", "../models/Lamborginhi/Wheel.obj"))
wheels[2].name = "WheelRB"
wheels[2].position.set(-85.429, 36.416, -146.734)
wheels[2].rotation.y = Math.PI
car.add(wheels[2])
wheels.push(loader.loadObject("../models/Lamborginhi/Wheel.mtl", "../models/Lamborginhi/Wheel.obj"))
wheels[3].name = "WheelLB"
wheels[3].position.set(85.429, 36.416, -146.734)
car.add(wheels[3])

car.add(spotLightR)
car.add(spotLightL)

car.scale.set(0.01, 0.01, 0.01)
scene.add(car)

const table = loader.loadObject("../models/table/table.mtl", "../models/table/table.obj")
scene.add(table)


//Game Loop
function loop() {
    requestAnimationFrame(loop)
    controls.update()
    renderer.render(scene, followCamera)
}

loop()