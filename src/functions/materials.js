import * as THREE from 'three'

export function createMaterials(gui, vertexShader, fragmentShader, planets){
    const materials = []

    planets.forEach((planet, index)=>{
        const materialParameters = {color: planet.color}

        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms:{
                uTime: new THREE.Uniform(0),
                uColor: new THREE.Uniform( new THREE.Color(materialParameters.color)),
            },
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        })

        materials.push(material)

        gui.addColor(materialParameters, 'color').name(`Sphere ${index + 1} Color`).onChange(()=>{
            material.uniforms.uColor.value.set(materialParameters.color)
        })

    })
   

    return materials
}