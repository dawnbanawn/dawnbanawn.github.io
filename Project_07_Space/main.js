import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

function scrollBottom() {window.scrollTo(0, 99999);}
if (document.addEventListener) document.addEventListener("DOMContentLoaded", scrollBottom, false)
else if (window.attachEvent) window.attachEvent("onload", scrollBottom);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

//const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
//const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
//const torus = new THREE.Mesh(geometry, material);

//scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

//const lightHelper = new THREE.PointLightHelper(pointLight);
//const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('public/bg2.png');
scene.background = spaceTexture;

//avatar
const danTexture = new THREE.TextureLoader().load('public/bg.png');
const dan = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map: danTexture})
);
scene.add(dan);

//planet
const planetTexture = new THREE.TextureLoader().load('public/bg.png');
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshBasicMaterial({map: planetTexture})
);
moon.position.z = 10;
moon.position.setX(-10);
scene.add(moon);



function animate(){
  requestAnimationFrame(animate);

  //torus.rotation.x += 0.01;
  //torus.rotation.y += 0.005;
  //torus.rotation.z += 0.01;
  moon.rotation.z += 0.005;
  controls.update();

  renderer.render(scene, camera);
}
animate();

function moveCamera(){
  //how far from the top of the page has been scrolled
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;
  dan.rotation.y += 0.01;
  dan.rotation.z += 0.01;
  //Moving the camera according to the scroll value.
  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.01;


}
document.body.onscroll = moveCamera


//Get your video element:
const video = document.getElementById('video');

//Create your video texture:
const videoTexture = new THREE.VideoTexture(video);
const videoMaterial =  new THREE.MeshBasicMaterial( {map: videoTexture, side: THREE.FrontSide, toneMapped: false} );
//Create screen
const screen = new THREE.PlaneGeometry(2, 1);
const videoScreen = new THREE.Mesh(screen, videoMaterial);
scene.add(videoScreen);