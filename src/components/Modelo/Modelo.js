import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader/";

const Template = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    //Data from the canvas
    const currentRef = mountRef.current;
    const { clientWidth: width, clientHeight: height } = currentRef;

    //Scene, camera, renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(25, width / height, 0.1, 100);
    scene.add(camera);
    camera.position.set(5, 5, 5);
    camera.lookAt(new THREE.Vector3());

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    currentRef.appendChild(renderer.domElement);

    //OrbitControls
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enableDamping = true;

    //Resize canvas
    const resize = () => {
      renderer.setSize(currentRef.clientWidth, currentRef.clientHeight);
      camera.aspect = currentRef.clientWidth / currentRef.clientHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", resize);
    const gltfLoader = new GLTFLoader();
    gltfLoader.load('./models/man/amongus.gltf', (gltf) => {
      console.log(gltf)
      scene.add(gltf.scene)
    },() => {
      console.log('loading')

    },() => {
      console.log('error')


    })
    //Animate the scene
    const animate = () => {
      orbitControls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();
    const ambientalLight = new THREE.AmbientLight(0xffffff,1);
    scene.add(ambientalLight);
    //cube
    // const cube = new THREE.Mesh(
    //   new THREE.BoxBufferGeometry(1, 1, 1),
    //   new THREE.MeshBasicMaterial()
    // );
    // scene.add(cube);

    return () => {
      window.removeEventListener("resize", resize);
      currentRef.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      className='Contenedor3D'
      ref={mountRef}
      style={{ width: "100%", height: "100vh" }}
    ></div>
  );
};

export default Template;
