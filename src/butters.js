'use strict'

class Butters extends THREE.Group {
    constructor() {

        super()

        this.models = []

        let butter = loadObject("../models/butter/butter.mtl", "../models/butter/butter.obj", true, false)
        butter.position.set(200, 2, 50)
        butter.rotateY(Math.PI / 2)
        butter.name = "Butter_0"
        this.models.push({
            model: butter,
            speed: 0
        })
        this.add(butter)

        butter = loadObject("../models/butter/butter.mtl", "../models/butter/butter.obj", true, false)
        butter.position.set(-200, 2, 50)
        butter.rotateY(Math.PI / 2)
        butter.name = "Butter_1"
        this.models.push({
            model: butter,
            speed: 0,
            direction: new THREE.Vector3(0, 0, 0)
        })
        this.add(butter)

        butter = loadObject("../models/butter/butter.mtl", "../models/butter/butter.obj", true, false)
        butter.position.set(0, 2, -200)
        butter.rotateY(Math.PI / 2)
        butter.name = "Butter_2"
        this.models.push({
            model: butter,
            speed: 0,
            direction: new THREE.Vector3(0, 0, 0)
        })
        this.add(butter)
    }

    onUpdate(delta) {
        this.models.forEach(element => {
            if (element.speed != 0 && delta > 0) {
                element.model.translateOnAxis(element.direction, element.speed * delta)

                if (element.speed > 0) {

                    element.speed -= delta * 2
                    if (element.speed < 0) element.speed = 0

                } else {

                    element.speed += delta * 2
                    if (element.speed > 0) element.speed = 0
                }
            }
        })
    }
}