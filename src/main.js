import './style.scss';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import vertexShader from './shaders/vertexShader.glsl';
import fragmentShader from './shaders/fragmentShader.glsl';
export default class Experience {
  constructor(container) {
    this.container = document.querySelector(container);

    // Sizes
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.imageAspect = null;

    this.resize = () => this.onResize();
  }

  init() {
    this.createScene();
    this.createCamera();
    this.createRenderer();
    this.loadTextures();
    this.createControls();
    this.createMesh();

    this.addListeners();

    this.renderer.setAnimationLoop(() => {
      this.resize();
      this.render();
      this.update();
    });
  }

  createScene() {
    this.scene = new THREE.Scene();
  }

  createCamera() {
    this.camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, -10, 10);
    this.camera.position.z = 2;
  }

  loadTextures() {
    this.textureLoader = new THREE.TextureLoader();

    this.texture1 = this.textureLoader.load('./1.jpg', (tex) => {
      // this.imageAspect = tex.image.width / tex.image.height;
    });
    this.texture2 = this.textureLoader.load('./2.jpg', (tex) => {
      // this.imageAspect = tex.image.width / tex.image.height;
    });
    this.texture3 = this.textureLoader.load('./3.jpg', (tex) => {
      // this.imageAspect = tex.image.width / tex.image.height;
    });
    this.texture4 = this.textureLoader.load('./4.jpg', (tex) => {
      // this.imageAspect = tex.image.width / tex.image.height;
    });
    this.texture5 = this.textureLoader.load('./5.jpg', (tex) => {
      // this.imageAspect = tex.image.width / tex.image.height;
    });
    this.texture6 = this.textureLoader.load('./6.jpg', (tex) => {
      // this.imageAspect = tex.image.width / tex.image.height;
    });
    this.texture7 = this.textureLoader.load('./7.jpg', (tex) => {
      // this.imageAspect = tex.image.width / tex.image.height;
    });
    this.texture8 = this.textureLoader.load('./8.jpg', (tex) => {
      this.imageAspect = tex.image.width / tex.image.height;
    });
    this.texture9 = this.textureLoader.load('./9.jpg', (tex) => {
      // this.imageAspect = tex.image.width / tex.image.height;
    });
  }

  createRenderer() {
    this.renderer = new THREE.WebGLRenderer({ alpha: false, antialias: true });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.container.appendChild(this.renderer.domElement);
  }

  createControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.enabled = false;
  }

  createMesh() {
    this.geometry = new THREE.PlaneGeometry(1, 1);
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTexture: { value: this.texture8 },
        uScale: { value: new THREE.Vector2(1, 1) },
      },
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.shaderScale = this.material.uniforms.uScale.value;
    this.scene.add(this.mesh);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  update() {
    this.controls.update();
  }

  onResize() {
    // Update sizes
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    // Update camera
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    // Ipdate renderer
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    if (this.imageAspect > this.camera.aspect) {
      this.shaderScale.set(this.imageAspect / this.camera.aspect, 1);
    } else {
      this.shaderScale.set(1, this.camera.aspect / this.imageAspect);
    }
  }

  addListeners() {
    window.addEventListener('resize', this.resize);
    this.renderer.domElement.addEventListener('webglcontextlost', () => {
      location.reload();
    });
  }
}

const experience = new Experience('#app');
experience.init();
