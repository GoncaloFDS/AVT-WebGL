'use strict'
import loader from "./loader.js"

let currentCamera, scene, renderer, clock
let followCamera, orthoCamera, topCamera
let controls
let worldWidth = 1400
let worldHeight = 700
let lights, sun
let stats
let particles
let car, cheerios, butters, table, oranges

function init() {
    //Scene
    scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0)
    scene.fog = new THREE.FogExp2(0xaaaaaa, 0.005)

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
    document.body.appendChild(WEBVR.createButton(renderer));
    renderer.vr.enabled = true;
    renderer.setAnimationLoop(gameLoop);
    createScene();
    createCameras();

    //Camera Controls
    controls = new THREE.OrbitControls(followCamera, renderer.domElement);
    controls.enableDamping = true
    controls.campingFactor = 0.25
    controls.enablePan = false;
    controls.enableZoom = false;

    //Evens
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);

    //Stats
    stats = new Stats();
    document.body.appendChild(stats.dom);
}

function createScene() {

    lights = new Lights()
    scene.add(lights)

    //Car
    car = new Car()
    scene.add(car)

    //Table
    table = loader.loadObject("../models/table/table.mtl", "../models/table/table.obj", false, true)
    table.scale.set(5, 5, 5)
    table.name = "Table"
    scene.add(table)

    oranges = new THREE.Group()

    for (let i = 0; i < 10; i++) {
        oranges.add(new Orange())
    }
    scene.add(oranges)

    //Butters
    butters = new Butters()
    scene.add(butters)

    //Cheerios
    cheerios = new THREE.Group()

    for (let i = 0; i < 60; i++) {
        const angle = 6 * i;
        const x = 350 * Math.cos(angle * Math.PI / 180)
        const z = 350 * Math.sin(angle * Math.PI / 180)

        const cheerio = loader.loadObject("../models/cheerio/cheerio.mtl", "../models/cheerio/cheerio.obj", true, false)
        cheerio.position.set(x, 1.5, z)
        cheerio.name = "Cheerio_" + i
        cheerio.scale.set(3, 3, 3)
        cheerios.add(cheerio)
    }

    scene.add(cheerios)

    //Particle System
    particles = new ParticleSystem(renderer, scene, followCamera)
}

function createCameras() {
    followCamera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100000)
    followCamera.position.set(0, 10, -30)
    followCamera.lookAt(car.position)
    car.add(followCamera);
    const orthoCamera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 0.1, 100000);
    orthoCamera.position.set(0, 50, 0)
    const topCamera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 0.1, 100000);
    topCamera.position.set(0, 100, 0)
    currentCamera = followCamera
}

function gameLoop() {

    car.onUpdate(clock.getDelta(), oranges, butters, cheerios, lights.lamps)
    controls.target = car.position
    controls.object = currentCamera
    controls.update()

    lights.onUpdate(car, currentCamera)

    oranges.traverse(node => {
        if (node instanceof Orange) {
            node.move()
        }
    })
    butters.onUpdate(clock.getDelta())
    particles.OnUpdate()

    stats.update()

    render();
    //requestAnimationFrame(gameLoop)
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