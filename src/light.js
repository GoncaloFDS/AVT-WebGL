'use strict'

import Billboard from "./billboard.js";

export default class Lights extends THREE.Group {
    constructor() {
        super()

        //Lens Flare
        const textureLoader = new THREE.TextureLoader()
        let flares = []
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

        lens_flare.addElement(new THREE.LensflareElement(textureLoader.load("../models/lens flare/sun.png"), 5 * scale_lens, 0.0, new THREE.Color(0xffffff)))
        lens_flare.addElement(new THREE.LensflareElement(flares[5], 5 * scale_lens, 0.03, new THREE.Color(0x555555)))
        lens_flare.addElement(new THREE.LensflareElement(flares[3], 2.3 * scale_lens, 0.05, new THREE.Color(0x555555)))
        lens_flare.addElement(new THREE.LensflareElement(flares[1], scale_lens, 0.10, new THREE.Color(0x555555)))
        lens_flare.addElement(new THREE.LensflareElement(flares[6], 0.5 * scale_lens, 0.15, new THREE.Color(0x555555)))
        lens_flare.addElement(new THREE.LensflareElement(flares[0], 0.2 * scale_lens, 0.20, new THREE.Color(0x555555)))
        lens_flare.addElement(new THREE.LensflareElement(flares[2], 0.6 * scale_lens, 0.25, new THREE.Color(0x555555)))
        lens_flare.addElement(new THREE.LensflareElement(flares[8], 1.2 * scale_lens, 0.3, new THREE.Color(0x555555)))
        lens_flare.addElement(new THREE.LensflareElement(flares[4], 0.7 * scale_lens, 0.35, new THREE.Color(0x555555)))
        lens_flare.addElement(new THREE.LensflareElement(flares[0], 0.12 * scale_lens, 0.40, new THREE.Color(0x555555)))
        lens_flare.addElement(new THREE.LensflareElement(flares[6], 2 * scale_lens, 0.45, new THREE.Color(0x555555)))
        lens_flare.addElement(new THREE.LensflareElement(flares[8], scale_lens, 0.5, new THREE.Color(0x555555)))
        lens_flare.addElement(new THREE.LensflareElement(flares[2], 0.7 * scale_lens, 0.55, new THREE.Color(0x555555)))
        lens_flare.addElement(new THREE.LensflareElement(flares[5], 3 * scale_lens, 0.6, new THREE.Color(0x555555)))
        lens_flare.addElement(new THREE.LensflareElement(flares[3], 4 * scale_lens, 0.65, new THREE.Color(0x555555)))
        lens_flare.addElement(new THREE.LensflareElement(flares[7], 6 * scale_lens, 0.7, new THREE.Color(0x555555)))

        this.add(lens_flare)

        //Directional Light
        let dirLight = new THREE.DirectionalLight(0xffffff, 0.5)
        dirLight.castShadow = true
        dirLight.shadow.mapSize.width = 8192
        dirLight.shadow.mapSize.height = 8192
        dirLight.shadow.camera.near = 1
        dirLight.shadow.camera.far = 800
        dirLight.shadow.camera.left = -350
        dirLight.shadow.camera.right = 350
        dirLight.shadow.camera.top = -300
        dirLight.shadow.camera.bottom = 300
        dirLight.shadow.bias = -0.001
        dirLight.shadow.radius = 0.5
        dirLight.add(lens_flare)
        dirLight.position.set(0, 200, 400)
        this.add(dirLight)

        //Lamps
        this.lamps = new THREE.Group()
        for (let i = 0; i < 6; i++) {

            let lamp = new Billboard(textureLoader.load("../models/lamp/lamp.png"))
            const angle = 60 * i;
            const x = 250 * Math.cos(angle * Math.PI / 180)
            const z = 250 * Math.sin(angle * Math.PI / 180)

            let pointLight = new THREE.PointLight(0xffffff, 0.2)
            pointLight.decay = 100
            pointLight.translateY(40)

            lamp.add(pointLight)
            lamp.position.set(x, 37, z)
            this.lamps.add(lamp)
        }

        this.add(this.lamps)
    }

    onUpdate(player, camera) {
        this.lamps.traverse(node => {
            if (node instanceof Billboard) node.onUpdate(player, camera)
        })
    }
}