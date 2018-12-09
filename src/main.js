import loader from "./loader.js";
import carMethods from "./car.js";
import {Lights } from "./light.js";
import { ParticleSystem } from "./particles.js"

//Scene
let scene = new THREE.Scene()
scene.background = new THREE.Color(0x0)
//scene.fog = new THREE.FogExp2(0x333333, 0.0005)

//Clock
let clock = new THREE.Clock()

//Camera
let followCamera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 100000)
followCamera.position.set(400, 200, -300)
followCamera.lookAt(scene.position)

const orthoCamera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 0.1, 100000)
orthoCamera.position.set(0, 90, 0)
const topCamera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 0.1, 100000)
topCamera.position.set(0, 180, 0)

let currentCamera = followCamera

//Renderer
let renderer = new THREE.WebGLRenderer({
    antialias: true,
    logarithmicDepthBuffer: true,
    alpha: true
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.gammaOutput = true
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
document.body.appendChild(renderer.domElement)

//Camera Controls
let controls = new THREE.OrbitControls(followCamera, renderer.domElement)
controls.enableDamping = true
controls.campingFactor = 0.25
controls.enableZoom = true

//Lights
let lights = new Lights(scene)

//Objects
let car = carMethods.createCar(scene)
car.body.add(followCamera)

let table = loader.loadObject("../models/table/table.mtl", "../models/table/table.obj", false, true)
table.scale.set(5, 5, 5)
table.name = "Table"
scene.add(table)

let butters = []

butters.push(loader.loadObject("../models/butter/butter.mtl", "../models/butter/butter.obj", true, false))
butters[0].position.set(200, 2, 50)
butters[0].rotateY(Math.PI / 2)
butters[0].name = "Butter_0"
scene.add(butters[0])

butters.push(loader.loadObject("../models/butter/butter.mtl", "../models/butter/butter.obj", true, false))
butters[1].position.set(-200, 2, 50)
butters[1].rotateY(Math.PI / 2)
butters[1].name = "Butter_1"
scene.add(butters[1])

butters.push(loader.loadObject("../models/butter/butter.mtl", "../models/butter/butter.obj", true, false))
butters[2].position.set(0, 2, -200)
butters[2].rotateY(Math.PI / 2)
butters[2].name = "Butter_2"
scene.add(butters[2])

for (let i = 0; i < 100; i++) {
    const angle = 3.6 * i;
    const x = 300 * Math.cos(angle)
    const z = 300 * Math.sin(angle)

    const cheerio = loader.loadObject("../models/cheerio/cheerio.mtl", "../models/cheerio/cheerio.obj", true, false)
    cheerio.position.set(x, 1, z)
    cheerio.name = "Cheerio_" + i
    scene.add(cheerio)
}

//Particle System
let particles = new ParticleSystem(renderer, scene, followCamera)

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

let stats = new Stats();
document.body.appendChild(stats.dom);

loop()

//Game Loop
function loop() {

    requestAnimationFrame(loop)
    onUpdate()
    renderer.render(scene, currentCamera)
}

//Update
function onUpdate() {

    stats.update()
    controls.update()
    particles.OnUpdate()

    followCamera.lookAt(car.body.position)
}