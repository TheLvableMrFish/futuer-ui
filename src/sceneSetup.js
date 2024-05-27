import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export function setupScene(canvas, gui){

    // Scene
    const scene = new THREE.Scene()

    // Sizes
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    // Texture Loader
    const textureLoader = new THREE.TextureLoader()
    const backgroundTexture = textureLoader.load('./planetTextures/stars.jpg')
    const backgroundGeometry = new THREE.SphereGeometry(50, 64, 64)
    backgroundGeometry.scale(-1, 1, 1)

    const backgroundMaterial = new THREE.MeshBasicMaterial({ map: backgroundTexture})

    const backgroundMesh = new THREE.Mesh(backgroundGeometry, backgroundMaterial)

    scene.add(backgroundMesh)

    // Camera
    const camera = new THREE.PerspectiveCamera(25, sizes.width / sizes.height, 0.1, 100)
    camera.position.set(7, 3, 22)
    scene.add(camera)

    // Controls
    const controls = new OrbitControls(camera, canvas)
    controls.enableDamping = true

    // Renderer
    // const rendererParameters = { clearColor: '#1d1f2a'}
    const renderer = new THREE.WebGLRenderer({canvas, antialias: true})
    // renderer.setClearColor(rendererParameters.clearColor)
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // gui.addColor(rendererParameters, 'clearColor').onChange(()=>{
    //     renderer.setClearColor(rendererParameters.clearColor)
    // })

    return{ scene, camera, controls, renderer}
}