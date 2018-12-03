function loadObject(mtl_path, obj_path) {

    let object = new THREE.Object3D()
    let mtlLoader = new THREE.MTLLoader()
    let objLoader = new THREE.OBJLoader()

    mtlLoader.setMaterialOptions({
        ignoreZeroRGBs: true
    })

    mtlLoader.load(mtl_path, materials => {
        materials.preload()
        objLoader.setMaterials(materials)
        objLoader.load(obj_path, obj => object.add(obj))
    })

    object.traverse(node => {

        if (node instanceof THREE.Object3D) {
            node.castShadow = true
            node.receiveShadow = true
        }
    })

    object.traverse(node => {

        console.log(node.receiveShadow && node.castShadow)
    })

    return object
}

export default {
    loadObject
}