'use strict'
class Billboard extends THREE.Object3D{
    constructor(texture){

        super()

        let plane = new THREE.PlaneGeometry(80, 80)
        let material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            side: THREE.DoubleSide,
            fog: false
        })
        
        let mesh = new THREE.Mesh(plane, material)
        mesh.castShadow = false
        mesh.receiveShadow = false
        mesh.renderOrder = 99
        this.add(mesh)
    }

    onUpdate(player, camera){

        let result = new THREE.Quaternion(0, 0, 0, 1)
        result.multiplyQuaternions(player.quaternion, camera.quaternion)

        this.quaternion.copy(result)
    }
}