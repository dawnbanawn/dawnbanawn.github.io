import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

function scrollBottom() {window.scrollTo(0, 99999);}
if (document.addEventListener) document.addEventListener("DOMContentLoaded", scrollBottom, false)
else if (window.attachEvent) window.attachEvent("onload", scrollBottom);

const scene = new THREE.Scene();

//const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});

//renderer.setPixelRatio(window.devicePixelRatio);
renderer.setPixelRatio(2);
renderer.setSize(sizes.width, sizes.height);
//renderer.setSize(window.innerWidth, window.innerHeight);
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
  const geometry = new THREE.SphereGeometry(0.15, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(150));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('public/bg2v3.jpg');
scene.background = spaceTexture;

//avatar
const danTexture = new THREE.TextureLoader().load('public/bg.png');
const dan = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map: danTexture})
);
//scene.add(dan);

//planet
const planetTexture = new THREE.TextureLoader().load('public/moon.jpg');
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




//Resize
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.updateProjectionMatrix();
  camera.aspect = sizes.width / sizes.height;
  renderer.setSize(sizes.width, sizes.height);
});

//Get the video element:
const video01 = document.getElementById('video01');
//Create your video texture:
const videoTexture01 = new THREE.VideoTexture(video01);
const videoMaterial01 =  new THREE.MeshBasicMaterial( {map: videoTexture01, side: THREE.FrontSide, toneMapped: false} );

const Texture01 = new THREE.TextureLoader().load('public/bg.png');
const Material01 = new THREE.MeshBasicMaterial( {map: Texture01} );

//Spacedoor textures
const doorTexture01 = new THREE.TextureLoader().load('public/doorLeft.jpg');
const doorMaterial01 = new THREE.MeshBasicMaterial( {map: doorTexture01} );
const doorTexture02 = new THREE.TextureLoader().load('public/doorRight.jpg');
const doorMaterial02 = new THREE.MeshBasicMaterial( {map: doorTexture02} );

//Floor and roof textures
const floorTexture01 = new THREE.TextureLoader().load('public/floor.jpg');
const floorMaterial01 = new THREE.MeshBasicMaterial( {map: floorTexture01} );
const roofTexture01 = new THREE.TextureLoader().load('public/roof.jpg');
const roofMaterial01 = new THREE.MeshBasicMaterial( {map: roofTexture01} );

//Create screen
const screen = new THREE.PlaneGeometry(1.7, 1);
const videoScreen01 = new THREE.Mesh(screen, videoMaterial01);
const imgScreen01 = new THREE.Mesh(screen, Material01);
const door01 = new THREE.Mesh(screen, doorMaterial01);
const door02 = new THREE.Mesh(screen, doorMaterial02);
const floor01 = new THREE.Mesh(screen, floorMaterial01);
const roof01 = new THREE.Mesh(screen, roofMaterial01);


scene.add(videoScreen01, imgScreen01, door01, door02,floor01, roof01);

floor01.position.y = 39.1;
floor01.position.z = 42.8;
floor01.position.x = 0.5;
floor01.rotation.x = -1.95;
floor01.rotation.z = 0.025;

floor01.scale.x = 6;
floor01.scale.y = 6;

roof01.position.y = 44;
roof01.position.z = 42;
roof01.position.x = 0.4;
roof01.rotation.x = 0.7;
roof01.rotation.z = 0.025;

roof01.scale.x = 8;
roof01.scale.y = 9;




door01.position.x = -2;
door01.position.z = 39;
door01.position.y = 39;
door01.rotation.x = -0.75;
door01.rotation.z = 0.008;
door01.scale.y = 3;
door01.scale.x = 3;

door02.position.x = 3.1;
door02.position.z = 39;
door02.position.y = 39.05;
door02.rotation.x = -0.75;
door02.rotation.z = 0.008;
door02.scale.y = 3;
door02.scale.x = 3;

videoScreen01.position.x = 1.1;
videoScreen01.rotation.x = -0.75;
videoScreen01.rotation.y = -0.5;
videoScreen01.position.z = 15;
videoScreen01.position.y = 15;

imgScreen01.position.x = 1.8;
imgScreen01.rotation.x = -0.8;
imgScreen01.rotation.y = -0.5;
imgScreen01.position.z = 40.5;
imgScreen01.position.y = 40.5;

function moveCamera(){
  //how far from the top of the page has been scrolled
  const t = document.body.getBoundingClientRect().top;
  //moon.rotation.x += 0.05;
  //moon.rotation.y += 0.075;
  //scene.rotation.z = 0.025;
  //scene.position.x = 1;
  //moon.rotation.z += 0.05;
  //dan.rotation.y += 0.01;
  //dan.rotation.z += 0.01;
  //Moving the camera according to the scroll value.
  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.01;

  //Door opens.
  if (camera.position.z > 39 && camera.position.z < 41.5){
  door01.position.x -= (41.5 - camera.position.z) / 8;
  door02.position.x += (41.5 - camera.position.z) / 8;

  } else {
    door01.position.x = -2;
    door02.position.x = 3.1;

  }

  console.log(camera.position.z);
  if (camera.position.z > 15 && camera.position.z < 16){
    let text01 = document.querySelector(".text01");
    text01.style.opacity = camera.position.z -15;
  } else if (camera.position.z > 16 && camera.position.z < 17){
    let text01 = document.querySelector(".text01");
    text01.style.opacity = 17 - camera.position.z;
  } else {
    let text01 = document.querySelector(".text01");
    text01.style.opacity = 0; 
  }
}
document.body.onscroll = moveCamera;