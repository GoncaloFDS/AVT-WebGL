import loader from "./loader.js";
import carMethods from "./car.js";

//Scene
let scene = new THREE.Scene()

//Clock
let clock = new THREE.Clock()

//Camera
let followCamera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 100000)
followCamera.position.set(30, 30, 30)
const orthoCamera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 0.1, 100000)
orthoCamera.position.set(0, 50, 0)
const topCamera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 0.1, 100000)
topCamera.position.set(0, 100, 0)
let currentCamera = followCamera

followCamera.lookAt(scene.position)
//scene.add(followCamera)

//Renderer
let renderer = new THREE.WebGLRenderer({
    antialias: true,
    logarithmicDepthBuffer: true
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.gammaOutput = true
document.body.appendChild(renderer.domElement)

//Camera Controls
let controls = new THREE.OrbitControls(followCamera, renderer.domElement)
controls.enableDamping = true
controls.campingFactor = 0.25
controls.enableZoom = true

//Light
let dirLight = new THREE.DirectionalLight(0xffffff, 0.7)
dirLight.position.set(150, 150, -150)
// dirLight.castShadow = true
// dirLight.shadow = new THREE.LightShadow(followCamera)
// dirLight.shadow.bias = 0.0001
// dirLight.shadow.mapSize.height = 1024
// dirLight.shadow.mapSize.width = 1024
scene.add(dirLight)

let ambLight = new THREE.AmbientLight(0xffffff, 0.4)
ambLight.position.set(200, 200, 200)
scene.add(ambLight)

//Objects
let car = carMethods.createCar(scene)
car.body.add(followCamera)
const table = loader.loadObject("../models/table/table.mtl", "../models/table/table.obj")
scene.add(table)

scene.add(new THREE.GridHelper(1000, 10))

//Keyboard Input
document.body.addEventListener("keydown", event => {
    switch (event.key) {
        case "1":
            currentCamera = followCamera
            break
        case "2":
            currentCamera = orthoCamera
            break
        case "3":
            currentCamera = topCamera
            break
        case "w":
            carMethods.move(car, 1, clock)
            break
        case "s":
            carMethods.move(car, -1, clock)
            break
        case "a":
            carMethods.rotate(car, 1, clock)
            break
        case "d":
            carMethods.rotate(car, -1, clock)
            break
        case "z":
            carMethods.reset(car)
            break
        default:
            break;
    }
}, false)

document.body.addEventListener("keyup", event => {
    switch (event.key) {
        case "w":
            carMethods.move(car, 0, clock)
            break
        case "s":
            carMethods.move(car, 0, clock)
            break
        default:
            break;
    }
}, false)

loop()


//Game Loop
function loop() {

    requestAnimationFrame(loop)
    onUpdate()
    renderer.render(scene, currentCamera)
}

//Update
function onUpdate() {

    controls.update()
    followCamera.lookAt(car.body.position)
}