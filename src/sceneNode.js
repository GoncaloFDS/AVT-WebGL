'use strict'
export class SceneNode extends THREE.Object3D {
    constructor(){
        super();
        this.receiveShadow = true;
        this.castShadow = true;
        this.newPos = new THREE.Vector3(0, 0, 0);    
    }
}