import * as THREE from "three";
import GUI from "lil-gui";
import { AxisGridHelper } from "./axisGridHelper.js";

const gui = new GUI();

const scene = new THREE.Scene();
const objects = [];
const radius = 1;
const widthSegments = 6;
const heightSegments = 6;
const sphereGeometry = new THREE.SphereGeometry(
  radius,
  widthSegments,
  heightSegments
);

// solar system node
const solarSystem = new THREE.Object3D();
scene.add(solarSystem);
objects.push(solarSystem);

// const earth orbit
const earthOrbit = new THREE.Object3D();
earthOrbit.position.x = 10;
solarSystem.add(earthOrbit);
objects.push(earthOrbit);

const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xffff00 });
const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
sunMesh.scale.set(5, 5, 5);
// scene.add(sunMesh);
solarSystem.add(sunMesh);
objects.push(sunMesh);

const eathMaterial = new THREE.MeshPhongMaterial({
  color: 0x2233ff,
  emissive: 0x112244,
});
const earthMesh = new THREE.Mesh(sphereGeometry, eathMaterial);
// scene.add(earthMesh);
// solarSystem.add(earthMesh);
// earthMesh.position.x = 10;
earthOrbit.add(earthMesh);
objects.push(earthMesh);

const moonOrbit = new THREE.Object3D();
moonOrbit.position.x = 2;
earthOrbit.add(moonOrbit);

const moonMaterial = new THREE.MeshPhongMaterial({
  color: 0x888888,
  emissive: 0x222222,
});
const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
moonMesh.scale.set(0.5, 0.5, 0.5);
moonOrbit.add(moonMesh);
objects.push(moonMesh);

const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 50, 0);
camera.up.set(0, 0, 1);
camera.lookAt(0, 0, 0);
scene.add(camera);

// single point light in center of sun
const color = 0xffffff;
const intensity = 500;
const light = new THREE.PointLight(color, intensity);
scene.add(light);

const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

// add an AxesHelper to each node
const makeAxisGrid = (node, label, units) => {
  const helper = new AxisGridHelper(node, units);
  gui.add(helper, "visible").name(label);
};
makeAxisGrid(solarSystem, "SolarSystem", 25);
makeAxisGrid(sunMesh, "sunMesh");
makeAxisGrid(earthOrbit, "earthOrbit");
makeAxisGrid(earthMesh, "earthMesh");
makeAxisGrid(moonOrbit, "moonOrbit");
makeAxisGrid(moonMesh, "moonMesh");

const render = (time) => {
  time *= 0.001;
  objects.forEach((obj) => {
    obj.rotation.y = time;
  });

  renderer.render(scene, camera);
  window.requestAnimationFrame(render);
};
render();
