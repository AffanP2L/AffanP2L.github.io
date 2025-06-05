import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.154.0/build/three.module.js';

// Setup
const canvas = document.getElementById('three-hero-bg');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

function resizeRenderer() {
  const width = window.innerWidth;
  const height = document.querySelector('.hero').offsetHeight || window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}
resizeRenderer();

window.addEventListener('resize', resizeRenderer);

// 3D Objects: Spinning Torus Knot and Floating Particles
const geometry = new THREE.TorusKnotGeometry(1, 0.36, 140, 16);
const material = new THREE.MeshPhysicalMaterial({
  color: 0x4f8cff,
  metalness: 0.7,
  roughness: 0.25,
  clearcoat: 0.6,
  clearcoatRoughness: 0.15,
  transmission: 0.4,
  thickness: 2.5
});
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

// Add floating particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCnt = 220;
const positions = new Float32Array(particlesCnt * 3);
for (let i = 0; i < particlesCnt * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 8;
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const particlesMaterial = new THREE.PointsMaterial({ color: 0xff4081, size: 0.06, transparent: true });
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Lighting
const ambient = new THREE.AmbientLight(0xffffff, 0.55);
scene.add(ambient);
const point = new THREE.PointLight(0xffffff, 1.8, 100);
point.position.set(10, 10, 20);
scene.add(point);

camera.position.z = 4;

// Animate
function animate() {
  requestAnimationFrame(animate);
  torusKnot.rotation.x += 0.008;
  torusKnot.rotation.y += 0.012;
  particlesMesh.rotation.y += 0.0017;
  renderer.render(scene, camera);
}
animate();