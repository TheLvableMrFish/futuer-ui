import * as THREE from 'three'

export function createObjects(scene, materials, planets){
    
    const spheres = []

    planets.forEach((planet, index)=>{
        
        const sphere = new THREE.Mesh(
            new THREE.SphereGeometry(planet.size / 2),
            materials[index]
        )
        sphere.position.x = planet.radius
        spheres.push(sphere)
        scene.add(sphere)
    })
    
    return spheres
}