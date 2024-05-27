// Function to update mouse position

export function updateMousePosition(e, mouse, raycaster, camera){
    // Mouse position normalized
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
    raycaster.setFromCamera(mouse, camera)
}