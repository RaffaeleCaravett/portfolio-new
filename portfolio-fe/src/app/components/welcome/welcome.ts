import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MeasuresService } from '../../services/measures.service';
import { TooltipModule } from 'primeng/tooltip';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule, NgStyle } from '@angular/common';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTF, GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
@Component({
  selector: 'app-welcome',
  imports: [TooltipModule, MatTooltipModule, RouterLink, CommonModule, RouterModule, NgStyle],
  templateUrl: './welcome.html',
  styleUrl: './welcome.scss',
})
export class WelcomeComponent implements OnInit, AfterViewInit, OnDestroy {
  protected height: string = '0px';
  protected width: string = '0px';
  @ViewChild('threeContainer', { static: false })
  container!: ElementRef;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  private mixer!: THREE.AnimationMixer;
  private clock = new THREE.Clock();

  constructor(private measuresService: MeasuresService) {
    this.measuresService.measure.subscribe({
      next: (data: string[]) => {
        if (data && data.length > 0) {
          this.height = data[0];
          this.width = data[1];
        }
      },
    });
  }
  ngOnInit(): void {}

  ngAfterViewInit(): void {
      this.initialize();
  }
  initialize(): void {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#F9F9F9');

    const width = this.container.nativeElement.clientWidth;
    const height = this.container.nativeElement.clientHeight;

    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.set(0, 0, 5);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.container.nativeElement.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.autoRotate = true;
    const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
    this.scene.add(hemi);

    const dir = new THREE.DirectionalLight(0xffffff, 2);
    dir.position.set(5, 10, 7);
    this.scene.add(dir);

    const loader = new GLTFLoader();
    loader.load('/assets/welcome/models/scene.gltf', (gltf) => {
      const model = gltf.scene;
      if (gltf.animations.length > 0) {
        this.mixer = new THREE.AnimationMixer(model);

        const action = this.mixer.clipAction(gltf.animations[0]);
        action.play();
      }
      this.scene.add(model);
    });
    this.animate();
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());
    const delta = this.clock.getDelta();
    if (this.mixer) {
      this.mixer.update(delta);
    }
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  onResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
  toNumber(value: string): number {
    if (value.length > 0) {
      return Number(value.substring(0, value.length - 2));
    }
    return 0;
  }

  ngOnDestroy() {
    this.scene.clear();
    this.renderer.clear();
    this.camera.clear();
  }
}
