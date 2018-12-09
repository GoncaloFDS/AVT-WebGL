'use strict'
import loader from "./loader.js"
import {
    Car
} from "./car.js"
import {
    Lights
} from "./light.js"
import {
    ParticleSystem
} from "./particles.js"

var currentCamera, scene, renderer, clock
var followCamera, orthoCamera, topCamera
var controls
var worldWidth = 1400
var worldHeight = 700
var car
let lights
let stats
let particles

function init() {
    //Scene
    scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0)
    scene.fog = new THREE.FogExp2(0x333333, 0.0005)

    //Clock
    clock = new THREE.Clock()

    //Renderer
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        logarithmicDepthBuffer: true,
        alpha: true
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.gammaOutput = true
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    document.body.appendChild(renderer.domElement)

    createScene();
    createCameras();

    //Camera Controls
    controls = new THREE.OrbitControls(followCamera, renderer.domElement);
    controls.enableDamping = true
    controls.campingFactor = 0.25
    controls.enablePan = false;
    controls.enableZoom = true;

    //Evens
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);

    //Stats
    stats = new Stats();
    document.body.appendChild(stats.dom);
}

function createScene() {

    car = new Car()
    scene.add(car)

    lights = new Lights(scene)

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
    particles = new ParticleSystem(renderer, scene, followCamera)
}

function createCameras() {
    followCamera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 100000);
    followCamera.position.set(0, 20, -30)
    followCamera.lookAt(car.position)
    car.add(followCamera);
    const orthoCamera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 0.1, 100000);
    orthoCamera.position.set(0, 50, 0)
    const topCamera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 0.1, 100000);
    topCamera.position.set(0, 100, 0)
    currentCamera = followCamera
}

function gameLoop() {
    car.onUpdate(clock.getDelta())
    controls.target = car.position
    controls.object = currentCamera
    controls.update();

    stats.update()
    controls.update()
    particles.OnUpdate()

    render();
    requestAnimationFrame(gameLoop)
}

function render() {
    renderer.clear();
    renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
    renderer.render(scene, currentCamera);

    //    renderer.clearDepth(); // important! clear the depth buffer
    //    renderer.setViewport(window.innerWidth * 5 / 6, window.innerHeight * 4 / 5, 300, 100);
    //    renderer.render(hud, HUDCamera);
}

function onKeyDown(event) {
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
            car.moving = 1;
            //car.move(1, clock.getDelta())
            break
        case "s":
            car.moving = -1;
            //car.move(-1, clock.getDelta())
            break
        case "a":
            car.rotating = 1;
            //car.rotate(1, clock.getDelta())
            break
        case "d":
            car.rotating = -1;
            //car.rotate(-1, clock.getDelta())
            break
        case "z":
            car.reset()
            break
        default:
            break;
    }
}

function onKeyUp(event) {
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
        case "s":
            car.moving = 0;
            break
        case "a":
        case "d":
            car.rotating = 0;
            break
        case "z":
            car.reset()
            break
        default:
            break;
    }
}

function onResize(event) {
    var aspectRatio = window.innerWidth / window.innerHeight;

    renderer.setSize(window.innerWidth, window.innerHeight);
    if (window.innerWidth > 0 && window.innerHeight > 0) {
        if (aspectRatio < worldWidth / worldHeight) {

            currentCamera.left = -worldWidth / 2;
            currentCamera.right = worldWidth / 2;
            currentCamera.top = worldWidth / aspectRatio / 2;
            currentCamera.bottom = -worldWidth / aspectRatio / 2;
        } else {
            currentCamera.left = -worldHeight * aspectRatio / 2;
            currentCamera.right = worldHeight * aspectRatio / 2;
            currentCamera.top = worldHeight / 2;
            currentCamera.bottom = -worldHeight / 2;
        }
        currentCamera.aspect = aspectRatio;
        currentCamera.updateProjectionMatrix();
    }
}

export default {
    init,
    gameLoop
}