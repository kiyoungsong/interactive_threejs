import * as THREE from "three";

// 동적으로 캔버스 조립하기
// const renderer = new THREE.WebGLRenderer();
// 렌더러의 사이즈를 윈도우 사이즈로 지정
// renderer.setSize(window.innerWidth, window.innerHeight);
// body에 렌더러를 추가하는 방법도 있지만 index.html에 canvas 요소를 넣어서 추가해주는 방법도 있음
// document.body.appendChild(renderer.domElement);

const canvas = document.querySelector("#three-canvas");
// 캔버스로 가져온 값을 캔버스로 지정해줌 antialias를 사용하면 계단형태가 사라짐
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// scene
const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera(
  75, // 시야각
  window.innerWidth / window.innerHeight, // 종횡비
  0.1, // near
  1000 // far
);

// 디아블로, 롤과같은 원근감이 없는 카메라
// const camera = new THREE.OrthographicCamera(
//   -(window.innerWidth / window.innerHeight), // left
//   window.innerWidth / window.innerHeight, // right
//   1, // top
//   -1, // bottom
//   0.1,
//   1000
// );

// 카메라의 초기 위치를 정해주지 않으면 0,0,0의 좌표 값을 가짐
// 거리는 어떤 항목을 만들건지에 따라 다름 방을 만들경우 미터를 사용
camera.position.x = 1;
camera.position.y = 2;
camera.position.z = 5;
camera.lookAt(0, 0, 0);
// 줌아웃 효과를 주려면 zoom을 변경해야함
// camera.zoom = 0.5;
// 카메라 속성을 변경하면 업데이트를 해주어야함
// camera.updateProjectionMatrix();
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
