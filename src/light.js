export class Lights {

    constructor(scene) {

        //Lens Flare
        const textureLoader = new THREE.TextureLoader()
        this.flares = []
        this.flares.push(textureLoader.load("../models/lens flare/tex1.png"))
        this.flares.push(textureLoader.load("../models/lens flare/tex2.png"))
        this.flares.push(textureLoader.load("../models/lens flare/tex3.png"))
        this.flares.push(textureLoader.load("../models/lens flare/tex4.png"))
        this.flares.push(textureLoader.load("../models/lens flare/tex5.png"))
        this.flares.push(textureLoader.load("../models/lens flare/tex6.png"))
        this.flares.push(textureLoader.load("../models/lens flare/tex7.png"))
        this.flares.push(textureLoader.load("../models/lens flare/tex8.png"))
        this.flares.push(textureLoader.load("../models/lens flare/tex9.png"))

        this.lens_flare = new THREE.Lensflare()
        const scale_lens = 50

        this.lens_flare.addElement(new THREE.LensflareElement(textureLoader.load("../models/lens flare/sun.png"), 7 * scale_lens, 0.0, new THREE.Color(0xffffff)))
        this.lens_flare.addElement(new THREE.LensflareElement(this.flares[5], 5 * scale_lens, 0.0, new THREE.Color(0x555555)))
        this.lens_flare.addElement(new THREE.LensflareElement(this.flares[3], 2.3 * scale_lens, 0.07, new THREE.Color(0x555555)))
        this.lens_flare.addElement(new THREE.LensflareElement(this.flares[1], scale_lens, 0.14, new THREE.Color(0x555555)))
        this.lens_flare.addElement(new THREE.LensflareElement(this.flares[6], 0.5 * scale_lens, 0.21, new THREE.Color(0x555555)))
        this.lens_flare.addElement(new THREE.LensflareElement(this.flares[0], 0.2 * scale_lens, 0.28, new THREE.Color(0x555555)))
        this.lens_flare.addElement(new THREE.LensflareElement(this.flares[2], 0.6 * scale_lens, 0.35, new THREE.Color(0x555555)))
        this.lens_flare.addElement(new THREE.LensflareElement(this.flares[8], 1.2 * scale_lens, 0.42, new THREE.Color(0x555555)))
        this.lens_flare.addElement(new THREE.LensflareElement(this.flares[4], 0.7 * scale_lens, 0.49, new THREE.Color(0x555555)))
        this.lens_flare.addElement(new THREE.LensflareElement(this.flares[0], 0.12 * scale_lens, 0.56, new THREE.Color(0x555555)))
        this.lens_flare.addElement(new THREE.LensflareElement(this.flares[6], 2 * scale_lens, 0.63, new THREE.Color(0x555555)))
        this.lens_flare.addElement(new THREE.LensflareElement(this.flares[8], scale_lens, 0.7, new THREE.Color(0x555555)))
        this.lens_flare.addElement(new THREE.LensflareElement(this.flares[2], 0.7 * scale_lens, 0.77, new THREE.Color(0x555555)))
        this.lens_flare.addElement(new THREE.LensflareElement(this.flares[5], 3 * scale_lens, 0.84, new THREE.Color(0x555555)))
        this.lens_flare.addElement(new THREE.LensflareElement(this.flares[3], 4 * scale_lens, 0.91, new THREE.Color(0x555555)))
        this.lens_flare.addElement(new THREE.LensflareElement(this.flares[7], 6 * scale_lens, 0.98, new THREE.Color(0x555555)))

        //Directional Light
        this.dirLight = new THREE.DirectionalLight(0xffffff, 0.7)
        this.dirLight.castShadow = true
        this.dirLight.shadow.mapSize.width = 8192
        this.dirLight.shadow.mapSize.height = 8192
        this.dirLight.shadow.camera.near = 1
        this.dirLight.shadow.camera.far = 590
        this.dirLight.shadow.camera.left = -350
        this.dirLight.shadow.camera.right = 350
        this.dirLight.shadow.camera.top = -300
        this.dirLight.shadow.camera.bottom = 300
        this.dirLight.shadow.bias = -0.001
        this.dirLight.shadow.radius = 0.5
        this.dirLight.add(this.lens_flare)

        //Ambient Light
        this.ambLight = new THREE.AmbientLight(0xffffff, 0.05)
        this.ambLight.position.set(200, 200, 200)
        scene.add(this.ambLight)

        //Sun
        this.sun = new THREE.Group()
        this.sun.add(this.dirLight)
        this.sun.position.set(0, 200, 200)
        scene.add(this.sun)
    }
}