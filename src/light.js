function createLights(scene) {

    let lights = []

    //Lens Flare
    const textureLoader = new THREE.TextureLoader()
    const flares = []
    flares.push(textureLoader.load("../models/lens flare/tex1.png"))
    flares.push(textureLoader.load("../models/lens flare/tex2.png"))
    flares.push(textureLoader.load("../models/lens flare/tex3.png"))
    flares.push(textureLoader.load("../models/lens flare/tex4.png"))
    flares.push(textureLoader.load("../models/lens flare/tex5.png"))
    flares.push(textureLoader.load("../models/lens flare/tex6.png"))
    flares.push(textureLoader.load("../models/lens flare/tex7.png"))
    flares.push(textureLoader.load("../models/lens flare/tex8.png"))
    flares.push(textureLoader.load("../models/lens flare/tex9.png"))

    let lens_flare = new THREE.Lensflare()
    const scale_lens = 50

    lens_flare.addElement(new THREE.LensflareElement(flares[5], 5 * scale_lens, 0.15))
    lens_flare.addElement(new THREE.LensflareElement(flares[3], 2.3 * scale_lens, 0.2))
    lens_flare.addElement(new THREE.LensflareElement(flares[1], scale_lens, 0.25))
    lens_flare.addElement(new THREE.LensflareElement(flares[6], 0.5 * scale_lens, 0.3))
    lens_flare.addElement(new THREE.LensflareElement(flares[0], 0.2 * scale_lens, 0.35))
    lens_flare.addElement(new THREE.LensflareElement(flares[2], 0.6 * scale_lens, 0.4))
    lens_flare.addElement(new THREE.LensflareElement(flares[8], 1.2 * scale_lens, 0.45))
    lens_flare.addElement(new THREE.LensflareElement(flares[4], 0.7 * scale_lens, 0.5))
    lens_flare.addElement(new THREE.LensflareElement(flares[0], 0.12 * scale_lens, 0.55))
    lens_flare.addElement(new THREE.LensflareElement(flares[6], 2 * scale_lens, 0.6))
    lens_flare.addElement(new THREE.LensflareElement(flares[8], scale_lens, 0.65))
    lens_flare.addElement(new THREE.LensflareElement(flares[2], 0.7 * scale_lens, 0.7))
    lens_flare.addElement(new THREE.LensflareElement(flares[5], 3 * scale_lens, 0.76))
    lens_flare.addElement(new THREE.LensflareElement(flares[3], 4 * scale_lens, 0.82))
    lens_flare.addElement(new THREE.LensflareElement(flares[7], 6 * scale_lens, 0.9))

    //Lights
    let dirLight = new THREE.DirectionalLight(0xffffff, 0.7)
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

    dirLight.add(lens_flare)
    lights.push(dirLight)

    let ambLight = new THREE.AmbientLight(0xffffff, 0.05)
    ambLight.position.set(200, 200, 200)
    scene.add(ambLight)

    lights.push(ambLight)

    let sun = new THREE.Mesh(new THREE.PlaneGeometry(150, 150), new THREE.MeshBasicMaterial({
        map: textureLoader.load("../models/lens flare/sun.png"),
        transparent: true,
        
    }))
    sun.position.set(0, 200, 200)
    sun.add(dirLight)
    scene.add(sun)

    return {
        artificialLights: lights,
        sun: sun
    }
}

export default {
    createLights
}