import * as THREE from "three";

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

  // camera
  const camera = new THREE.PerspectiveCamera(
    75, // 시야각
    window.innerWidth / window.innerHeight, // 종횡비
    0.1, // near
    1000 // far
  );

  // 카메라의 초기 위치를 정해주지 않으면 0,0,0의 좌표 값을 가짐
  // 거리는 어떤 항목을 만들건지에 따라 다름 방을 만들경우 미터를 사용
  camera.position.z = 5;
  scene.add(camera);

  // 조명, DirectionalLight은 태양빛과 비슷함 전체적으로 다 비춰줌
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.x = 1;
  light.position.z = 2;
  scene.add(light);

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  // MeshBasic의 경우 광원에 영향을 받지않음
  const material = new THREE.MeshStandardMaterial({
    color: "red",
  });
  const mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    // getElapsedTime의 경우 함수가 실행되고 나서부터의 값을 의미하지만
    // getDelta의 경우 draw가 실행될때마다의 시간 차를 나타냄, 첫번째 호출과 두번째 호출의 차이
    // 이 두개를 동시에 같이 사용하면 안됨
    const delta = clock.getDelta();

    // 방법 2
    // 시간을 넣어줌으로써 디바이스에 종속되지 않고 성능을 보정해주는 역할을 함
    mesh.rotation.y += 2 * delta;
    mesh.position.y += delta;
    if (mesh.position.y > 3) {
      mesh.position.y = 0;
    }
    renderer.render(scene, camera);

    // 재귀 함수를 사용하기 때문에 계속 호출이됨
    // window.requestAnimationFrame(draw);
    // Three.js를 사용해서 AR/VR을 사용할때는 setAnimationLoop사용을
    renderer.setAnimationLoop(draw);
  }

  // 반응형 이벤트 처리
  function setSize() {
    // 카메라
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    draw();
  }

  // 이벤트
  window.addEventListener("resize", setSize);
  draw();
}
