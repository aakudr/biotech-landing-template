import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import Stats from 'three/addons/libs/stats.module'

const scene = new THREE.Scene() 
/* scene.add(new THREE.AxesHelper(5)) */
const light = new THREE.SpotLight()
light.position.set(20, 20, 20)
scene.add(light)
const light2 = new THREE.SpotLight()
light2.position.set(-20, -20, 20)
scene.add(light2)

const camera = new THREE.PerspectiveCamera(
    50,
    16 / 9,
    0.1,
    2000
)
camera.position.z = 15

const renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true })
renderer.setSize( window.innerWidth, window.innerHeight )
renderer.setClearColor( 0x000000, 0 ); // the default
document.querySelector('#moleculeWrapper')  .appendChild( renderer.domElement )

const controls = new OrbitControls( camera, renderer.domElement )
controls.autoRotate = true
controls.autoRotateSpeed = 4
controls.enableDamping = true
controls.update()

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshStandardMaterial( { 
    "color":16777215,
    "roughness":1,
    "metalness":1,
    "emissive":0,
    "envMapIntensity":1,
    "vertexColors":true,
    "depthFunc":3,
    "depthTest":true,
    "depthWrite":true,
    "colorWrite":true,
    "metalness": 0.5,
    "roughness": 0.5,
    "stencilWrite":false,
    "stencilWriteMask":255
 } )

const loader = new GLTFLoader()

loader.load(
    'assets/MeDHJA.glb',
    function (geometry) {
        alert(geometry)
        geometry.scene.position.set(0, 0, 0)
        scene.add(geometry.scene)
        scene.traverse(function (child) {
            if (child.isMesh) {
                child.material = material
                console.log(JSON.stringify(child.material))
            }
        })
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

function onWrapperResize() {
    const wrapper = document.querySelector('#moleculeWrapper').getBoundingClientRect()
    camera.aspect = wrapper.width / wrapper.height
    camera.updateProjectionMatrix()
    renderer.setSize(wrapper.width, wrapper.height)
}

document.querySelector('#moleculeWrapper').addEventListener('resize', onWrapperResize)
onWrapperResize()
animate()