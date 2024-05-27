import * as THREE from 'three'
import {GUI} from 'lil-gui'
import { setupScene } from './sceneSetup'
import { createMaterials } from './functions/materials'
import { createObjects } from './functions/objects'
import { handleResize } from './functions/resize'
import holographicVertexShader from './shaders/holographic/vertex.glsl'
import holographicFragmentShader from './shaders/holographic/fragment.glsl'
import planetsData from './data/planetsData'
import { updateMousePosition } from './functions/mousePosition'

// Debug
const gui = new GUI()
gui.close()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene, Camera, Renderer, controls
const { scene, camera, controls, renderer } = setupScene(canvas, gui)


// Materials
const materials = createMaterials(gui, holographicVertexShader, holographicFragmentShader, planetsData)

// Objects
const spheres = createObjects(scene, materials, planetsData)

// Resize
handleResize(camera, renderer)

// Raycaster and mouse
const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

// Mousemove event listener to handle hovering function
window.addEventListener('mousemove', (e)=>{
    updateMousePosition(e, mouse, raycaster, camera)
    updatePlanetScale()
})

// Function to update planet scale / stop them from moving
// variable that tracks if the planet should be moving, goes with function
let isMouseOverPlanet = false

function updatePlanetScale(){

    const intersects = raycaster.intersectObjects(spheres)
    const hoveredPlanet = intersects.length > 0 ? intersects[0].object : null

    spheres.forEach((planet)=>{
        if(planet === hoveredPlanet){
            planet.scale.set(1.2, 1.2, 1.2)
        } else{
            planet.scale.set(1, 1, 1)
        }
        
    })

    if(hoveredPlanet){
        isMouseOverPlanet = true
        return
    }

    if(isMouseOverPlanet){
        isMouseOverPlanet = false
    }
}

// Click event listener to handle selectClickedPlanet
window.addEventListener('click', (e)=>{
    updateMousePosition(e, mouse, raycaster, camera)
    selectClickedPlanet()
})

// Function to select a planet
function selectClickedPlanet(){

    // Calculate objects intersecting the ray
    const intersects = raycaster.intersectObjects(spheres)

    if(intersects.length > 0){
        const intersectedObject = intersects[0].object
        const planetIndex = spheres.indexOf(intersectedObject)
        if(planetIndex !== - 1){
            console.log(`Clicked on ${planetsData[planetIndex].name}`)
            NavigateToPage(planetsData[planetIndex].name)
        }
    }
}

// Function to navigate to another page based on clicked planet
function NavigateToPage(planetName){
    
    const pageURLs = {
        'Sun': './Sun.html',
        'Mercury': './Mercury.html',
        'Venus': './Venus.html',
        'Earth': './Earth.html',
        'Mars': './Mars.html',
        'Jupiter': './Jupiter.html',
        'Saturn': './Saturn.html',
        'Uranus': './Uranus.html',
        'Neptune': './Neptune.html',
    }

    if(pageURLs.hasOwnProperty(planetName)){
        const nextPageURL = pageURLs[planetName]
        window.location.href = nextPageURL
    } else{
        console.error(`No page URL found for ${planetName}`)
    }
    // const nextPageURL = pageURLs[planetName]

    // if(nextPageURL){
    //     fetch(nextPageURL)
    //         .then(res => res.text())
    //         .then(html =>{
    //             document.body.innerHTML = html
    //         })
    //         .catch(error => console.error('Error loading page: ', error))
    // } else{
    //     console.error(`No page URL found for ${planetName}`)
    // }
}

// Animate
const clock = new THREE.Clock()

const tick =()=>{
    
    if(!isMouseOverPlanet){
        const elapsedTime = clock.getElapsedTime()

        // Update materials
        materials.forEach(material =>{
            material.uniforms.uTime.value = elapsedTime
        })
    
        // Update planet positions
        let sunSize = planetsData[0].size
    
        planetsData.forEach((planet, index)=>{
            if(planet.show){
                planet.angle += planet.speedMod * 0.005
                spheres[index].position.x = planet.radius * 2 * Math.cos(planet.angle)
                spheres[index].position.z = planet.radius * 2 * Math.sin(planet.angle)
            }
        })
    }
    

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()