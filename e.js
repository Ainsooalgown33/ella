
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load font and display text
const loader = new THREE.FontLoader();
loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
  for (let i = 0; i < 20; i++) {
    const textGeometry = new THREE.TextGeometry('I love you so much 💖', {
      font: font,
      size: 0.2,
      height: 0.05
    });
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0xff66cc });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.set(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * -20);
    scene.add(textMesh);
  }
});

// Add red heart-like spheres
for (let i = 0; i < 30; i++) {
  const geometry = new THREE.SphereGeometry(0.1, 16, 16);
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const heart = new THREE.Mesh(geometry, material);
  heart.position.set(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * -20);
  scene.add(heart);
}

// Animate scene
function animate() {
  requestAnimationFrame(animate);
  scene.rotation.y += 0.001;
  renderer.render(scene, camera);
}
animate();

// Handle window resizing
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
