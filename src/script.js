import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { TextureLoader } from 'three'

//Loading 
const textureloader =new THREE.TextureLoader()

const NormalTexture = textureloader.load('/textures/normalmap.png')
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereBufferGeometry( .5, 64, 64 );

// Materials

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
material.normalMap = NormalTexture;

material.color = new THREE.Color(0xff0000ff)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

const pointLight2 = new THREE.PointLight(0xff0000, 5)
pointLight2.position.x = 1
pointLight2.position.y = 1
pointLight2.position.z = 1

scene.add(pointLight2)

gui.add(pointLight2.position, 'y').min(-9).max (9).step(0.01)
gui.add(pointLight2.position, 'x').min(-9).max (9).step(0.01)
gui.add(pointLight2.position, 'z').min(-9).max (9).step(0.01)
gui.add(pointLight2, 'intensity').min(1).max (10).step(0.01)
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

document.addEventListener("mousemove", onDocumentMouseMove)

let mouseX = 0;
let mouseY = 0;

let TargetX = 0;
let TargetY = 0;

const windowX =window.innerWidth / 2;
const windowY = window.innerHeight /2;

function onDocumentMouseMove(event) {
    mouseX = (event.clientX -windowX)
    mouseY = (event.clientY - windowY)
}

const clock = new THREE.Clock()

const tick = () =>
{

    TargetX = mouseX * .001
    TargetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    sphere. rotation.y += .15 * (TargetX - sphere.rotation.y)
    sphere. rotation.x += .15 * (TargetY - sphere.rotation.x)
    sphere. rotation.z += -0.15 * (TargetY - sphere.rotation.x)


    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()