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
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap
document.body.appendChild(renderer.domElement)

//Camera Controls
let controls = new THREE.OrbitControls(followCamera, renderer.domElement)
controls.enableDamping = true
controls.campingFactor = 0.25
controls.enableZoom = true

//Light
let dirLight = new THREE.DirectionalLight(0xffffff, 1)
dirLight.position.set(300, 300, -300)
dirLight.castShadow = true

//dirLight.shadow.bias = 0.001
dirLight.shadow.mapSize.width = 1024
dirLight.shadow.mapSize.height = 1024
dirLight.shadow.camera.near = 1
dirLight.shadow.camera.far = 1000
dirLight.shadow.camera.left = -300
dirLight.shadow.camera.right = 300
dirLight.shadow.camera.top = -300
dirLight.shadow.camera.bottom = 300
//dirLight.shadow.radius = 1.5

scene.add(dirLight)

let ambLight = new THREE.AmbientLight(0xffffff, 0.0)
ambLight.position.set(200, 200, 200)
scene.add(ambLight)

//Objects
let car = carMethods.createCar(scene)
car.body.add(followCamera)

const groundMaterial = new THREE.MeshPhongMaterial({
    color: 0x3C3C3C
});
const plane = new THREE.Mesh(new THREE.PlaneGeometry(500, 500), groundMaterial);
plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true;

scene.add(plane);

// let table = loader.loadObject("../models/table/table.mtl", "../models/table/table.obj")
// table.scale.set(5, 5, 5)
// scene.add(table)

let butters = []

butters.push(loader.loadObject("../models/butter/butter.mtl", "../models/butter/butter.obj"))
butters[0].position.set(200, 2, 50)
butters[0].rotateY(Math.PI / 2)
scene.add(butters[0])

butters.push(loader.loadObject("../models/butter/butter.mtl", "../models/butter/butter.obj"))
butters[1].position.set(-200, 2, 50)
butters[1].rotateY(Math.PI / 2)
scene.add(butters[1])

butters.push(loader.loadObject("../models/butter/butter.mtl", "../models/butter/butter.obj"))
butters[2].position.set(0, 2, -200)
butters[2].rotateY(Math.PI / 2)
scene.add(butters[2])

for (let i = 0; i < 100; i++) {
    const angle = 3.6 * i;
    const x = 300 * Math.cos(angle)
    const z = 300 * Math.sin(angle)

    const cheerio = loader.loadObject("../models/cheerio/cheerio.mtl", "../models/cheerio/cheerio.obj")
    cheerio.position.set(x, 1, z)
    scene.add(cheerio)
}

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