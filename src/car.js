import loader from "./loader.js";

function createCar(scene) {

    //Right SpotLight
    let spotLightR = new THREE.SpotLight(0xffffff, 0.8)
    spotLightR.decay = 2
    spotLightR.penumbra = 0.45
    //spotLightR.castShadow = true
    spotLightR.position.set(60, 50, 200)
    spotLightR.target = new THREE.Object3D()
    spotLightR.target.position.set(80, 50, 50000)
    spotLightR.target.updateMatrixWorld()
    spotLightR.add(spotLightR.target)

    //Left SpotLight
    let spotLightL = new THREE.SpotLight(0xffffff, 0.8)
    spotLightL.decay = 2
    spotLightL.penumbra = 0.45
    //spotLightL.castShadow = true
    spotLightL.position.set(-60, 50, 200)
    spotLightL.target = new THREE.Object3D()
    spotLightL.target.position.set(-80, 50, 50000)
    spotLightL.target.updateMatrixWorld()
    spotLightL.add(spotLightL.target)

    let car = loader.loadObject("../models/Lamborginhi/Body.mtl", "../models/Lamborginhi/Body.obj")


    let wheels = []
    wheels.push(loader.loadObject("../models/Lamborginhi/Wheel.mtl", "../models/Lamborginhi/Wheel.obj"))
    wheels[0].name = "WheelRF"
    wheels[0].position.set(-85.429, 34.599, 128.173)
    wheels[0].rotation.y = Math.PI

    car.add(wheels[0])
    wheels.push(loader.loadObject("../models/Lamborginhi/Wheel.mtl", "../models/Lamborginhi/Wheel.obj"))
    wheels[1].name = "WheelLF"
    wheels[1].position.set(85.429, 34.599, 128.173)

    car.add(wheels[1])
    wheels.push(loader.loadObject("../models/Lamborginhi/Wheel.mtl", "../models/Lamborginhi/Wheel.obj"))
    wheels[2].name = "WheelRB"
    wheels[2].position.set(-85.429, 36.416, -146.734)
    wheels[2].rotation.y = Math.PI

    car.add(wheels[2])
    wheels.push(loader.loadObject("../models/Lamborginhi/Wheel.mtl", "../models/Lamborginhi/Wheel.obj"))
    wheels[3].name = "WheelLB"
    wheels[3].position.set(85.429, 36.416, -146.734)

    car.add(wheels[3])

    car.add(spotLightR)
    car.add(spotLightL)

    car.scale.set(0.01, 0.01, 0.01)

    scene.add(car)

    return {
        body: car,
        wheels: wheels,
        spotLightL: spotLightL,
        spotLightR: spotLightR,
        speed: 0,
        acceleration: 1,
        life: 5,
        turn_speed: 0.5
    }
}

function move(car, amount, clock) {

    if (car.speed * amount > 0) car.speed += amount * car.acceleration * clock.getDelta()
    else if (amount) car.speed += amount * (car.acceleration * 4) * clock.getDelta()
    else {
        if (car.speed > 0.01) car.speed -= car.acceleration * 3 * clock.getDelta()
        else if (car.speed < -0.01) car.speed += car.acceleration * 3 * clock.getDelta()
        else car.speed = 0
    }

    if (car.speed > 2.5) car.speed = 2.5
    else if (car.speed < -2.5) car.speed = -2.5

    car.body.translateZ(car.speed)
    car.body.updateMatrixWorld()
}

function rotate(car, amount, clock) {

    const rot = car.turn_speed * amount * clock.getDelta()
    car.body.rotateY(rot)
    car.body.updateMatrixWorld()
}

function reset(car) {
    car.life = 5
    car.body.position.set(0, 0, 0)
    car.body.rotation.set(0, 0, 0)
}

export default {
    createCar,
    move,
    rotate,
    reset
}