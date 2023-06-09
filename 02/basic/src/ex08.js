import * as THREE from "three";
import gsap from "gsap";

export default function example() {
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 해당기기의 픽셀값, 2면 100픽셀을 200으로 표현한다는 의미
  // Three.js에서 고해상도로 표현할때 쓰는 함수임
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  // scene
  const scene = new THREE.Scene();
  // 안개 색상, 안개 범위, 원근감을 추가
  scene.fog = new THREE.Fog("black", 3, 7);

  // camera
  const camera = new THREE.PerspectiveCamera(
    75, // 시야각
    window.innerWidth / window.innerHeight, // 종횡비
    0.1, // near
    1000 // far
  );

  camera.position.y = 1;
  camera.position.z = 5;
  scene.add(camera);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.x = 1;
  light.position.y = 3;
  light.position.z = 10;
  scene.add(light);

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({
    color: "red",
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // 그리기
  let oldTime = Date.now();
  function draw() {
    const newTime = Date.now();
    const deltaTime = newTime - oldTime;
    oldTime = newTime;

    renderer.render(scene, camera);
    renderer.setAnimationLoop(draw);
  }

  // gsap
  gsap.to(mesh.position, {
    duration: 1, // 재생시간
    y: 2,
    z: 3,
  });

  // 반응형 이벤트 처리
  function setSize() {
    // 카메라
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  // 이벤트
  window.addEventListener("resize", setSize);
  draw();
}
