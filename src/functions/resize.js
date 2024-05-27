export function handleResize(camera, renderer){
    window.addEventListener('resize', ()=>{
        
        // Update sizes
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }

        // Update Camera
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()

        // Update renderer
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })
}