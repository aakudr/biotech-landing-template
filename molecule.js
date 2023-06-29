import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import Stats from 'three/addons/libs/stats.module'

const scene = new THREE.Scene() 
scene.add(new THREE.AxesHelper(5))
const light = new THREE.SpotLight()
light.position.set(20, 20, 20)
scene.add(light)

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 3

const renderer = new THREE.WebGLRenderer()
renderer.setSize( window.innerWidth, window.innerHeight )
document.body.appendChild( renderer.domElement )

const controls = new OrbitControls( camera, renderer.domElement )
controls.enableDamping = true
controls.update()

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshPhysicalMaterial({
    color: 0x000000,
    metalness: 0.25,
    roughness: 0.1,
    opacity: 1.0,
    transparent: true,
    transmission: 0.99,
    clearcoat: 1.0,
    clearcoatRoughness: 0.25
})

const loader = new GLTFLoader()

loader.load(
    'assets/MeDHJA.glb',
    function (geometry) {
        alert(geometry)
        scene.add(geometry.scene)
    }
)

const stats = new Stats()
document.body.appendChild(stats.dom)

function animate() {
    requestAnimationFrame(animate)

    controls.update()

    render()

    stats.update()
}

function render() {
    renderer.render(scene, camera)
}

animate()