import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import * as TWEEN from "@tweenjs/tween.js";
var num: any = null;

async function getJson(url: RequestInfo) {
  const res = await fetch(url);
  const json = await res.json();
  return json;
}

export default class ThreePlayer {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  light0: THREE.AmbientLight;
  light1: THREE.DirectionalLight;
  light2: THREE.DirectionalLight;
  light3: THREE.DirectionalLight;
  // light4: THREE.DirectionalLight;
  controls: OrbitControls;
  labelRenderer:CSS2DRenderer;
  animateObj: any;
  constructor(dom: HTMLElement) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.labelRenderer = new CSS2DRenderer();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(0.66, 9.26, 8.98);
    this.controls.maxPolarAngle = 1.5
    // this.controls.
    
    this.light0 = new THREE.AmbientLight(0xffffff, 0.5);
    this.light1 = new THREE.DirectionalLight(0xcccccc, 0.8);
    this.light1.position.set(5, 55, 523);
    this.light2 = new THREE.DirectionalLight(0xcccccc, 0.8);
    this.light2.position.set(5, -55, -523);
    this.light3 = new THREE.DirectionalLight(0x777777, 0.5);
    this.light3.position.set(5, 237, 23);
    // this.light4 = new THREE.DirectionalLight(0x777777, 0.4);
    // this.light4.position.set(5, 26, -46);
    this.init(dom);
	this.animateObj = null;
    window.addEventListener("resize", this.onWindowResize, false);
  }

  private async init(dom: HTMLElement) {
    
    this.renderer.setClearColor(0x9bcbfd);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    dom.appendChild(this.renderer.domElement);
    
    this.labelRenderer.setSize( window.innerWidth, window.innerHeight );
    this.labelRenderer.domElement.style.position = 'absolute';
    this.labelRenderer.domElement.style.top = '0px';
    this.labelRenderer.domElement.style.pointerEvents = 'none'
		dom.appendChild( this.labelRenderer.domElement );

    this.scene.add(this.light0);
    this.scene.add(this.light2);
    this.scene.add(this.light1);
    this.scene.add(this.light3);
    // this.scene.add(this.light4);

    this.animate();
  }

  public async load(
    url: string,
    onLoad: (obj: THREE.Object3D, resolve: any) => void,
    getProgress?:(progress: any) => void
  ): Promise<void> {
    const loader = new THREE.ObjectLoader();
    return new Promise<void>((resolve, reject) => {
      loader.load(
        url,
        (obj) => {
          onLoad(obj, resolve);
        },
        (xhr) => {
          if(getProgress) getProgress(xhr)
        }
      );
    });
  }
  private onWindowResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.labelRenderer.setSize( window.innerWidth, window.innerHeight )
  };
  private render() {
    let scene = this.scene;
    if (TWEEN) TWEEN.update();
    this.camera.lookAt(this.controls.target);
    this.camera.updateProjectionMatrix();
    this.renderer.render(this.scene, this.camera);
    this.labelRenderer.render(  this.scene,  this.camera );
  }
  private animate = () => {
    requestAnimationFrame(this.animate);
    this.render();
  };
  public  destroy() {
  	// 销毁
  	try {
  		// gpu内存释放
  		// this.removeModel(null, this.scene);
  		// 内存释放
  		this.scene.clear();
  		this.renderer.dispose();
  		this.renderer.forceContextLoss();
  		THREE.Cache.clear();
  
  		cancelAnimationFrame(this.animateObj);
  		let gl: any = this.renderer.domElement.getContext('webgl')
  		gl && gl.getExtension("WEBGL_lose_context").loseContext();
  		console.log("内存释放")
  		
  	} catch (e) {
  		console.log(e);
  	}
  }
  public rotateAroundWorldAxis(object: any, axis: any, radians: any) {
    let rotWorldMatrix = new THREE.Matrix4();
    rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);
    rotWorldMatrix.multiply(object.matrix);
    object.matrix = rotWorldMatrix;
    object.rotation.setFromRotationMatrix(object.matrix);
  }
  
}
