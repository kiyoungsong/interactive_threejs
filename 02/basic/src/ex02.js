import * as THREE from "three";

export default function example() {
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 해당기기의 픽셀값, 2면 100픽셀을 200으로 표현한다는 의미
  // Three.js에서 고해상도로 표현할때 쓰는 함수임
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  // scene
  const scene = new THREE.Scene();

  // camera
  const camera = new THREE.PerspectiveCamera(
    75, // 시야각
    window.innerWidth / window.innerHeight, // 종횡비
    0.1, // near
    1000 // far
  );

  // 카메라의 초기 위치를 정해주지 않으면 0,0,0의 좌표 값을 가짐
  // 거리는 어떤 항목을 만들건지에 따라 다름 방을 만들경우 미터를 사용
  camera.position.x = 1;
  camera.position.y = 2;
  camera.position.z = 5;
  scene.add(camera);

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  // MeshBasic의 경우 광원에 영향을 받지않음
  const material = new THREE.MeshBasicMaterial({
    color: "red",
  });
  const mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);

  // 그리기
  renderer.render(scene, camera);

  // 반응형 이벤트 처리
  function setSize() {
    // 카메라
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  // 이벤트
  window.addEventListener("resize", setSize);
}
