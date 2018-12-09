//Particle System
export class ParticleSystem {
    constructor(renderer, scene, camera) {

        this.proton = new Proton()
        this.emitter = new Proton.Emitter()

        this.emitter.rate = new Proton.Rate(new Proton.Span(100, 150), new Proton.Span(.4, 1))
        this.emitter.addInitialize(new Proton.Mass(1))
        this.emitter.addInitialize(new Proton.Radius(new Proton.Span(10, 20)))

        this.proton_position = new Proton.Position()
        this.proton_position.addZone(new Proton.BoxZone(400, 100, 400))
        this.emitter.addInitialize(this.proton_position)
        this.emitter.addInitialize(new Proton.Life(4, 6))

        this.emitter.addInitialize(new Proton.Velocity(0, new Proton.Vector3D(0, -0.3, 0), 90))
        this.emitter.addBehaviour(new Proton.RandomDrift(10, 1, 10, .05))
        this.emitter.addBehaviour(new Proton.Rotate("random", "random"))
        this.emitter.addBehaviour(new Proton.Gravity(0.3))
        this.emitter.addBehaviour(new Proton.Color('random'))

        this.camera =  new THREE.OrthographicCamera(-500, 500, 100, -100, 5, 1000)
        this.camera.position.z = 100
        this.screenZone = new Proton.ScreenZone(this.camera, renderer, 0, "234")
        this.emitter.addBehaviour(new Proton.CrossZone(this.screenZone, "dead"))
        this.emitter.p.y = 150
        this.emitter.emit()
        this.proton.addEmitter(this.emitter)
        this.proton.addRender(new Proton.SpriteRender(scene))
    }

    OnUpdate() {
        this.proton.update()
    }
}