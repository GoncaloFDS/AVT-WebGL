'use strict'

import loader from "./loader.js"

export default class Car extends THREE.Group{
    constructor() {
        super()

        //Right SpotLight
        this.spotLightR = new THREE.SpotLight(0xffffff, 2)
        this.spotLightR.decay = 2
        this.spotLightR.penumbra = 0.65
        this.spotLightR.castShadow = true
        this.spotLightR.shadow.camera.fov = 30
        this.spotLightR.shadow.mapSize.width = 2048
        this.spotLightR.shadow.mapSize.height = 2048
        this.spotLightR.position.set(60, 50, 240)
        this.spotLightR.target = new THREE.Object3D()
        this.spotLightR.target.position.set(80, 50, 50000)
        this.spotLightR.target.updateMatrixWorld()
        this.spotLightR.add(this.spotLightR.target)
        this.spotLightR.name = "SpotLightR"

        //Left SpotLight
        this.spotLightL = new THREE.SpotLight(0xffffff, 2)
        this.spotLightL.decay = 2
        this.spotLightL.penumbra = 0.65
        this.spotLightL.castShadow = true
        this.spotLightL.shadow.camera.fov = 30
        this.spotLightL.shadow.mapSize.width = 2048
        this.spotLightL.shadow.mapSize.height = 2048
        this.spotLightL.position.set(-60, 50, 240)
        this.spotLightL.target = new THREE.Object3D()
        this.spotLightL.target.position.set(-80, 50, 50000)
        this.spotLightL.target.updateMatrixWorld()
        this.spotLightL.add(this.spotLightL.target)
        this.spotLightL.name = "SpotLightL"

        //Car Wheels
        this.wheels = []
        this.wheels.push(loader.loadObject("../models/Lamborginhi/Wheel.mtl", "../models/Lamborginhi/Wheel.obj", true, false))
        this.wheels[0].name = "WheelRF"
        this.wheels[0].position.set(-85.429, 34.599, 128.173)
        this.wheels[0].rotation.y = Math.PI

        this.wheels.push(loader.loadObject("../models/Lamborginhi/Wheel.mtl", "../models/Lamborginhi/Wheel.obj", true, false))
        this.wheels[1].name = "WheelLF"
        this.wheels[1].position.set(85.429, 34.599, 128.173)

        this.wheels.push(loader.loadObject("../models/Lamborginhi/Wheel.mtl", "../models/Lamborginhi/Wheel.obj", true, false))
        this.wheels[2].name = "WheelRB"
        this.wheels[2].position.set(-85.429, 36.416, -146.734)
        this.wheels[2].rotation.y = Math.PI

        this.wheels.push(loader.loadObject("../models/Lamborginhi/Wheel.mtl", "../models/Lamborginhi/Wheel.obj", true, false))
        this.wheels[3].name = "WheelLB"
        this.wheels[3].position.set(85.429, 36.416, -146.734)

        //Car Body
        this.model = loader.loadObject("../models/Lamborginhi/Body.mtl", "../models/Lamborginhi/Body.obj", true, true)
        this.add(this.model);
        this.model.add(this.wheels[0])
        this.model.add(this.wheels[1])
        this.model.add(this.wheels[2])
        this.model.add(this.wheels[3])
        this.model.add(this.spotLightR)
        this.model.add(this.spotLightL)
        this.model.name = "Car"
        this.model.scale.set(0.05, 0.05, 0.05)

        this.speed = 0
        this.acceleration = 1
        this.life = 5
        this.turn_speed = 1
        this.moving = 0
        this.rotating = 0
    }


    move(amount, deltaTime) {

        if (this.speed * amount > 0) this.speed += amount * this.acceleration * deltaTime
        else if (amount) this.speed += amount * (this.acceleration * 4) * deltaTime
        else {
            if (this.speed > 0.01) this.speed -= this.acceleration * 3 * deltaTime
            else if (this.speed < -0.01) this.speed += this.acceleration * 3 * deltaTime
            else this.speed = 0
        }

        if (this.speed > 2.5) this.speed = 2.5
        else if (this.speed < -2.5) this.speed = -2.5
        this.translateZ(amount)
    }

    rotate(amount, deltaTime) {

        const rot = this.turn_speed * amount * deltaTime
        this.rotateY(rot)
    }

    reset() {
        this.life = 5
        this.position.set(0, 0, 0)
        this.rotation.set(0, 0, 0)
    }

    onUpdate(deltaTime) {
        this.move(this.moving, deltaTime);
        this.rotate(this.rotating, deltaTime);
    }
}