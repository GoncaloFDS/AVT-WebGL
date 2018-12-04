function loadObject(mtl_path, obj_path, castShadow, receiveShadow) {

    let object = new THREE.Group()
    let mtlLoader = new THREE.MTLLoader()
    let objLoader = new THREE.OBJLoader()

    mtlLoader.setMaterialOptions({
        ignoreZeroRGBs: true
    })

    mtlLoader.load(mtl_path, materials => {
        materials.preload()
        objLoader.setMaterials(materials)
        objLoader.load(obj_path, obj => obj.traverse(node => {
            if (node instanceof THREE.Mesh) {
                node.castShadow = castShadow
                node.receiveShadow = receiveShadow
                object.add(node)
            }
        }))
    })

    return object
}

export default {
    loadObject
}