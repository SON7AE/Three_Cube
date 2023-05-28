import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import GUI from 'lil-gui'

window.addEventListener('load', function () {
    init()
})

function init() {
    console.log(THREE)

    const options = {
        color: 0x00ffff,
    }

    // ADD RENDERER
    const renderer = new THREE.WebGLRenderer({
        // alpha: true, // 영역 투명도
        antialias: true, // 라인 매끄럽게 (계단현상 없이)
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    // ADD SCENE
    const scene = new THREE.Scene()

    // ADD CAMERA
    // 원근감을 표현하기 위해 PerspectiveCamera를 사용한다.
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 500)
    const controls = new OrbitControls(camera, renderer.domElement)
    // const axesHelper = new THREE.AxesHelper(5)
    controls.autoRotate = true
    // controls.enableDamping = true // 관성의 유무
    // controls.dampingFactor = 0.01 // 관성의 정도
    // controls.enableZoom = true
    // controls.enablePan = true
    // controls.maxDistance = 50 // 최대거리
    // controls.minDistance = 10 // 최소거리

    // CREATE MESH
    // const geometry = new THREE.BoxGeometry(2, 2, 2)
    // const material = new THREE.MeshBasicMaterial({ color: 0xcc99ff })
    const cubeGeometry = new THREE.IcosahedronGeometry(1)
    const cubeMaterial = new THREE.MeshLambertMaterial({
        color: 0x00ffff,
        emissive: 0x111111,
        // transparent: true,
        // opacity: 0.5,
        // visible: false,
        // wireframe: true,
        // side: THREE.DoubleSide,
    })
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
    const skeletonGeometry = new THREE.IcosahedronGeometry(2)
    const skeletonMaterial = new THREE.MeshBasicMaterial({
        wireframe: true,
        transparent: true,
        opacity: 0.2,
        color: 0xaaaaaa,
    })
    const skeleton = new THREE.Mesh(skeletonGeometry, skeletonMaterial)

    scene.add(cube, skeleton)

    camera.position.z = 5
    // camera.position.set(3, 4, 5)
    // camera.lookAt(cube.position)

    // 큐브의 음영
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    // const ambientLight = new THREE.AmbientLight(0xffffff, 0.1)

    directionalLight.position.set(-1, 2, 3)
    // ambientLight.position.set(3, 2, 1)

    scene.add(directionalLight)
    // scene.add(ambientLight)

    // CLOCK
    const clock = new THREE.Clock()

    render()

    // ANIMATION
    function render() {
        // cube.rotation.x = THREE.MathUtils.degToRad(45)
        // cube.rotation.x = Date.now() / 1000
        // cube.rotation.x = clock.getElapsedTime()
        const elapsedTime = clock.getElapsedTime()

        // cube.rotation.x = elapsedTime
        // cube.rotation.y = elapsedTime

        // skeleton.rotation.x = elapsedTime * 1.5
        // skeleton.rotation.y = elapsedTime * 1.5

        // cube.position.y = Math.sin(cube.rotation.x)
        // cube.scale.x = Math.cos(cube.rotation.x)

        renderer.render(scene, camera)
        controls.update()

        requestAnimationFrame(render)
    }

    // RENDERER RESIZING
    function handleResize() {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()

        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.render(scene, camera)

        controls.update()
    }

    window.addEventListener('resize', handleResize)

    // GUI INSTANCE
    const gui = new GUI()
    // gui.add(cube.position, 'y', -3, 3, 0.1)
    // 코드의 가독성을 위해 아래처럼 메서드 체이닝으로 변환
    gui.add(cube.position, 'y').min(-3).max(3).step(0.1)
    gui.add(cube, 'visible')
    gui.addColor(options, 'color').onChange((value) => {
        cube.material.color.set(value)
    })
}
