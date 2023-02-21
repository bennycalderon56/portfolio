//import './style.css';
import * as THREE from "https://unpkg.com/three@0.127.0/build/three.module.js";

import { OrbitControls } from "https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js";

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 6, 8);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);
// const wormTexture = new THREE.TextureLoader().load('tmp3.jpg');
// const geometry = new THREE.TorusKnotGeometry(10, 1.5, 59, 15,);
// const material = new THREE.MeshStandardMaterial({ map: wormTexture });
// const torus = new THREE.Mesh(geometry, material);


scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(360));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// Avatar

const bennyTextures = [
 new THREE.TextureLoader().load('benny.png'),
 new THREE.TextureLoader().load('benny1.png'),
 new THREE.TextureLoader().load('benny2.jpg'),
 new THREE.TextureLoader().load('benny3.png'),
 new THREE.TextureLoader().load('benny4.png'),
 new THREE.TextureLoader().load('benny5.jpg'),
];


const bmaterials = [];

for (let i = 0; i < 6; i++) {
  bmaterials.push(new THREE.MeshBasicMaterial({ map: bennyTextures[i] }));
}
// 
const benny = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  bmaterials
);

// for (let i = 0; i < 6; i++) {
//     benny.geometry.faces[i].materialIndex = i;
// }
  

scene.add(benny);

// Moon

const moonTexture = new THREE.TextureLoader().load('tmp.jpg');


const moon = new THREE.Mesh(
  new THREE.TetrahedronGeometry(3, 1),
  new THREE.MeshStandardMaterial({
    map: moonTexture
  })
);

scene.add(moon);


const knotTexture = new THREE.TextureLoader().load('tmp3.jpg');

const knot = new THREE.Mesh(
  new THREE.TorusKnotGeometry( 7, 2, 100, 3 ),
  new THREE.MeshBasicMaterial( { map: knotTexture } ),
  
);
//scene.add( knot );


moon.position.z = 30;
moon.position.setX(-10);

knot.position.x = 2
knot.position.z = 40

benny.position.z = -5;
benny.position.x = 2;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  // benny.rotation.x += 0.01;
  // benny.rotation.y += 0.03;
  // benny.rotation.z += 0.03;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  benny.rotation.x += 0.01;
  benny.rotation.y += 0.015;
  benny.rotation.z += 0.01;


  moon.rotation.x += 0.005;

  knot.rotation.x += 0.01;
  knot.rotation.y += 0.005;
  knot.rotation.z += 0.01;

  // controls.update();

  renderer.render(scene, camera);
}

animate();

