import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import { HttpClient } from '@angular/common/http';
import GUI from 'lil-gui'; 
import { Location } from '@angular/common';


@Component({
  selector: 'app-three-d-scene',
  templateUrl: './three-d-scene.component.html',
  styleUrls: ['./three-d-scene.component.scss']
  
})
export class ThreeDSceneComponent {
  // @ViewChild('threeDcanvas', { static: true }) canvasContainer!: ElementRef;
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  renderer!: THREE.WebGLRenderer;
  controls!: OrbitControls;
 
  constructor( private http: HttpClient, private router: Router, private location: Location) {}

   ngOnInit() {
    this.initThreeJS();
  }

  ngAfterViewInit(): void {
    // this.initThreeJS();
   
  }
  goBack(): void {
    this.location.back();
  }


  initThreeJS() {
    const objectDistance = 4;
    // const gui = new GUI();
    const canvas = document.getElementById('threeDcanvas');
   const scene = new THREE.Scene();
   const parameters = {
    materialColor: "#ffeded"
   }
  
  //  gui.addColor(parameters, 'materialColor').onChange(()=>{
  //   material.color.set(parameters.materialColor);
  //  });
     // Texture
  const textureLoader = new THREE.TextureLoader();
  const gradientTexture = textureLoader.load("./assets/images/3.jpg");
  gradientTexture.magFilter = THREE.NearestFilter;
  
  //  materials
  const material = new THREE.MeshToonMaterial({
    color:parameters.materialColor,
      gradientMap: gradientTexture,
  
  })
  
   // objects


  const meshes: (THREE.Mesh | THREE.Group)[] = [];

// Load the GLTF model
const loader = new GLTFLoader();
loader.load('./assets/NeutralAir-A320.gltf', (gltf) => {
  const model = gltf.scene;

  const box = new THREE.Box3().setFromObject(model);
  const size = new THREE.Vector3();
  box.getSize(size);
  const maxDimension = Math.max(size.x, size.y, size.z);
  const scaleFactor = 2 / maxDimension; 
  model.scale.setScalar(scaleFactor);

  const center = new THREE.Vector3();
  box.getCenter(center);
  model.position.sub(center); 

 
  meshes.unshift(model);

  meshes.push(
    new THREE.Mesh(new THREE.TorusGeometry(1, 0.4, 16, 60), material),
    new THREE.Mesh(new THREE.ConeGeometry(1, 2, 32), material),
    new THREE.Mesh(new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16), material)
  );

  // Position and add all to scene
  meshes.forEach((mesh, index) => {
    mesh.position.setY(-(objectDistance * index));
    mesh.position.setX(2 * (index % 2 === 0 ? 1 : -1));
    scene.add(mesh);
  });
});


  const ambientLight = new THREE.AmbientLight(0xffffff, 2); 
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
  directionalLight.position.set(1, 1, 0);
  scene.add(directionalLight);

      const sizes = {
            width: window.innerWidth,
            height: window.innerHeight,
          };

  let scrollY = window.scrollY;
  let currentSection = 0;
  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
    const newSection = Math.floor(scrollY / sizes.height);
  
    if (newSection !== currentSection) {
      currentSection = newSection;
      // anime({
      //   targets: [meshes[currentSection].rotation],
      //   duration: 1500,
      //   ease: 'easeInOutQuad',
      //   x: '+=6',
      //   y: '+=3',
      //   z: '+=1.5',
      // });
    }
  });

  const cursor = { x: 0, y: 0 };
  
  window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = event.clientY / sizes.height - 0.5;
  });
   

// Base camera

    const cameraGroup = new THREE.Group();
     scene.add(cameraGroup);
      const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100);
      camera.position.z = 6;
      cameraGroup.add(camera);
      

      if (!canvas) {
        return;
      }
    
const renderer = new THREE.WebGLRenderer({canvas , alpha: true });
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});


                const sky = new Sky();
                  sky.scale.setScalar(1000); 
                  const uniforms = sky.material.uniforms;
                  uniforms['turbidity'].value = 10;
                  uniforms['rayleigh'].value = 2;
                  uniforms['mieCoefficient'].value = 0.005;
                  uniforms['mieDirectionalG'].value = 0.8;
                  const sun = new THREE.Vector3();
                  const phi = THREE.MathUtils.degToRad(90 - 36);
                  const theta = THREE.MathUtils.degToRad(1 * 180); 
                  sun.setFromSphericalCoords(1, phi, theta);
                  uniforms['sunPosition'].value.copy(sun);
                  // scene.add(sky);

  

                   

                  const clock = new THREE.Clock();
                  let previousTime = 0;
                  
                  const tick = () => {
                    const elapsedTime = clock.getElapsedTime();
                    const deltaTime = elapsedTime - previousTime;
                    previousTime = elapsedTime;
                  
                    // Render
                    renderer.render(scene, camera);
                  
                    meshes.forEach((mesh) => {
                      // mesh.rotation.x += deltaTime * 0.1;
                      mesh.rotation.y += deltaTime * 0.12;
                    });
                  
                    const parallaxX = cursor.x * 0.5;
                    const parallaxY = -cursor.y * 0.5;
                  
                    camera.position.y = (-scrollY / sizes.height) * objectDistance;
                    cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 5 * deltaTime;
                    cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 5 * deltaTime;
                    window.requestAnimationFrame(tick);
                  };
                  
                  tick();

       
      
}


}
