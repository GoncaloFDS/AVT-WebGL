'use strict'

class Orange extends THREE.Object3D {
    constructor() {
        super()

        this.model = loadObject("../models/Orange/orange.mtl", "../models/Orange/orange.obj", true, true)
        this.add(this.model)
        this.name = "Orange"
        this.rotateSpeed = 0.1
        this.spawn()
    }

    spawn() {
        this.position.set(Math.random() * 700 - 350, 3, Math.random() * 700 - 350)
        this.speed = new THREE.Vector3(Math.random() - 0.5, 0, Math.random() - 0.5)
        this.speed.normalize()
        this.speed.multiplyScalar(0.3)
    }

    move() {
        this.translateX(this.speed.x)
        this.translateZ(this.speed.z)
        this.model.rotateX(this.rotateSpeed)

        if(this.position.distanceTo(new THREE.Vector3(0, 0, 0)) > 380){
            this.spawn()
        }
    }
}