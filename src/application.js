'use strict'
var currentCamera, scene, renderer, HUDRenderer, clock, hud;
var followCamera, orthoCamera, topCamera;
var controls;
var worldWidth = 1400;
var worldHeight = 700;
var ambLight, pointLight, dirLight;
var car;
var mesh;

function init() {
    scene = new THREE.Scene();
    clock = new THREE.Clock(true);
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        logarithmicDepthBuffer: true
    })
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.gammaOutput = true;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(renderer.domElement);

    
    createScene();
    createCameras();
    
    controls = new THREE.OrbitControls(followCamera, renderer.domElement);
    controls.enableDamping = true
    controls.campingFactor = 0.25
    controls.enablePan = false;
    controls.enableZoom = true;
    
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);
}

function createScene(){
    ambLight = new THREE.AmbientLight(0xffffff, 1);
    ambLight.position.set(200, 200, 200);
    scene.add(ambLight);
    
    pointLight = new THREE.PointLight(0xffffff, 1);
    scene.add(pointLight);
    
    dirLight = new THREE.DirectionalLight(0xffffff, 0.7)
    dirLight.position.set(0, 200, 200)
    dirLight.castShadow = true
    
    dirLight.shadow.mapSize.width = 8192
    dirLight.shadow.mapSize.height = 8192
    dirLight.shadow.camera.near = 1
    dirLight.shadow.camera.far = 590
    dirLight.shadow.camera.left = -350
    dirLight.shadow.camera.right = 350
    dirLight.shadow.camera.top = -300
    dirLight.shadow.camera.bottom = 300
    dirLight.shadow.bias = -0.001
    dirLight.shadow.radius = 0.5
    
    scene.add(dirLight);
    
    car = new Car();
    scene.add(car);
    
    var table = loadObject("../models/table/table.mtl", "../models/table/table.obj", false, true)
    table.scale.set(5, 5, 5)
    table.name = "Table"
    scene.add(table)
}

function createCameras(){
    followCamera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 100000);
    followCamera.position.set(0, 20, -30);
    followCamera.lookAt(car.position);
    car.add(followCamera);
    const orthoCamera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 0.1, 100000);
    orthoCamera.position.set(0, 50, 0);
    const topCamera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 0.1, 100000);
    topCamera.position.set(0, 100, 0);
    currentCamera = followCamera;
}

function gameLoop(){
    car.onUpdate(clock.getDelta());
    controls.target = car.position;
    controls.object = currentCamera;
    controls.update();
    render();
    requestAnimationFrame(gameLoop)
}

function render(){
    renderer.clear();
    renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
    renderer.render(scene, currentCamera);

//    renderer.clearDepth(); // important! clear the depth buffer
//    renderer.setViewport(window.innerWidth * 5 / 6, window.innerHeight * 4 / 5, 300, 100);
//    renderer.render(hud, HUDCamera);
}

function onKeyDown(event){
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
            car.rotating  = 1;
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