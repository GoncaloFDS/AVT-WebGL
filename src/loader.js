function loadObject(mtl_path, obj_path) {
    
    let object = new THREE.Object3D()
    let mtlLoader = new THREE.MTLLoader()
    let objLoader = new THREE.OBJLoader()

    mtlLoader.load(mtl_path, materials => {
        materials.preload()
        objLoader.setMaterials(materials)
        objLoader.load(obj_path, obj => object.add(obj), xhr => console.log('Loading Mesh: ' + Math.floor(xhr.loaded / xhr.total * 100) + '% loaded'), error => console.error(error))
    }, xhr => console.log('Loading Material: ' + Math.floor(xhr.loaded / xhr.total * 100) + '% loaded'), error => console.error(error))

    return object
}

export default {
    loadObject
}