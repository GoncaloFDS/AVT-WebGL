'use strict'

class Car extends THREE.Group {
    constructor() {
        super()

        //Right SpotLight
        this.spotLightR = new THREE.SpotLight(0xffffff, 0.8)
        this.spotLightR.decay = 30
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
        this.spotLightL = new THREE.SpotLight(0xffffff, 0.8)
        this.spotLightL.decay = 30
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
        this.wheels.push(loadObject("../models/Lamborginhi/Wheel.mtl", "../models/Lamborginhi/Wheel.obj", true, false))
        this.wheels[0].name = "WheelRF"
        this.wheels[0].position.set(-85.429, 34.599, 128.173)
        this.wheels[0].rotation.y = Math.PI

        this.wheels.push(loadObject("../models/Lamborginhi/Wheel.mtl", "../models/Lamborginhi/Wheel.obj", true, false))
        this.wheels[1].name = "WheelLF"
        this.wheels[1].position.set(85.429, 34.599, 128.173)

        this.wheels.push(loadObject("../models/Lamborginhi/Wheel.mtl", "../models/Lamborginhi/Wheel.obj", true, false))
        this.wheels[2].name = "WheelRB"
        this.wheels[2].position.set(-85.429, 36.416, -146.734)
        this.wheels[2].rotation.y = Math.PI

        this.wheels.push(loadObject("../models/Lamborginhi/Wheel.mtl", "../models/Lamborginhi/Wheel.obj", true, false))
        this.wheels[3].name = "WheelLB"
        this.wheels[3].position.set(85.429, 36.416, -146.734)

        //Car Body
        this.model = loadObject("../models/Lamborginhi/Body.mtl", "../models/Lamborginhi/Body.obj", true, true)
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
        this.maxSpeed = 0.5
        this.acceleration = 0.1
        this.life = 5
        this.turn_speed = 0.1
        this.moving = 0
        this.rotating = 0
    }

    move(amount, deltaTime, oranges, butters, cheerios, lamps) {

        if (this.speed * amount > 0) this.speed += amount * this.acceleration * deltaTime
        else if (amount) this.speed += amount * (this.acceleration) * deltaTime
        else {
            if (this.speed > 0.01) this.speed -= this.acceleration * deltaTime
            else if (this.speed < -0.01) this.speed += this.acceleration * deltaTime
            else this.speed = 0
        }

        if (this.speed >= this.maxSpeed) this.speed = this.maxSpeed
        else if (this.speed <= -this.maxSpeed) this.speed = -this.maxSpeed

        if (!(this.collisionDetection(oranges, butters, deltaTime, new THREE.Vector3(0, 0, amount), cheerios, lamps))) {

            this.translateZ(this.speed)
            this.wheels[0].rotateX(-amount / 5)
            this.wheels[1].rotateX(-amount / 5)
            this.wheels[2].rotateX(-amount / 5)
            this.wheels[3].rotateX(-amount / 5)
        }

        //if (this.position.distanceTo(new THREE.Vector3(0, 0, 0)) > 360) {
        //    this.translateZ(-2 * amount)
        //}
    }

    rotate(amount, deltaTime) {

        const rot = this.turn_speed * amount * deltaTime
        this.rotateY(rot)
    }

    reset() {
        this.life = 5
        this.position.set(0, 0, 0)
        this.rotation.set(0, 0, 0)
        this.speed = 0
    }

    onUpdate(deltaTime, oranges, butters, cheerios, lamps) {
        this.move(this.moving, deltaTime, oranges, butters, cheerios, lamps)
        this.rotate(this.rotating, deltaTime)
    }

    collisionDetection(oranges, butters, deltaTime, newPos, cheerios, lamps) {

        let boxCar = new THREE.Box3().setFromObject(this.model)
        boxCar.translate(newPos)
        let collision = false

        oranges.traverse(node => {
            if (node instanceof Orange && this.position.distanceTo(node.position) < 20) {
                let box = new THREE.Box3().setFromObject(node)

                if (boxCar.intersectsBox(box)) {
                    this.reset()
                    this.life--
                        collision = true
                }
            }
        })

        butters.models.forEach(element => {
            let box = new THREE.Box3().setFromObject(element.model)

            if (boxCar.intersectsBox(box)) {

                element.speed = this.speed * 5
                element.direction = this.getWorldDirection(element.direction)

                let temp = element.direction.x
                element.direction.x = -element.direction.z
                element.direction.z = temp
                collision = true
            }
        })
                butters.onUpdate(deltaTime)

        cheerios.children.forEach(element => {

            if (this.position.distanceTo(element.position) < 20) {
                let box = new THREE.Box3().setFromObject(element)

                if (boxCar.intersectsBox(box)) {
                    var d = this.getWorldDirection(d);
                    element.translateOnAxis(d, 2 * this.moving)
                    collision = true
                }
            }
        })

         lamps.traverse(node => {
            if (node instanceof Billboard && this.position.distanceTo(node.position) < 100) {

                let pos = new THREE.Vector3(node.position.x, boxCar.getCenter().y, node.position.z)

                if (!boxCar.distanceToPoint(pos)) {
                    collision = true
                }
            }
        })

        return collision
    }
}