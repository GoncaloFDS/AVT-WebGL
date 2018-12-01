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

let dirLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0)
dirLight.position.set(100, 0, 100)
scene.add(dirLight)

let mtlLoader = new THREE.MTLLoader()
let objLoader = new THREE.OBJLoader()

mtlLoader.load('../models/Orange/orange.mtl', materials => {
    materials.preload()
    objLoader.setMaterials(materials)
    objLoader.load('../models/Orange/orange.obj', obj => scene.add(obj), xhr => console.log('Orange (mesh): ' + Math.floor(xhr.loaded / xhr.total * 100) + '% loaded'), error => console.error(error))
}, xhr => console.log('Orange (material): ' + Math.floor(xhr.loaded / xhr.total * 100) + '% loaded'), error => console.error(error))


function loop() {
    requestAnimationFrame(loop)
    controls.update()
    renderer.render(scene, camera)
}

loop()