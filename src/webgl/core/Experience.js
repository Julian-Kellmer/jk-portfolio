import Sizes from "./Sizes";
import Time from "./Time";
import Camera from "./Camera";
import Renderer from "./Renderer";
import SceneManager from "./SceneManager";
import GalleryWorld from "../world/GalleryWorld";

export default class Experience {
  constructor(canvas, data = []) {
    window.experience = this;

    this.canvas = canvas;

    // Setup Core
    this.sizes = new Sizes(this.canvas);
    this.time = new Time();
    this.sceneManager = new SceneManager();
    this.scene = this.sceneManager.instance;
    this.camera = new Camera(this);
    this.renderer = new Renderer(this);

    // Setup World
    this.world = new GalleryWorld(this, data);

    // Listeners
    this.sizes.on("resize", () => {
      this.resize();
    });

    this.time.on("tick", () => {
      this.update();
    });
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.world.update();
    this.renderer.update();
  }

  destroy() {
    // Stop loops and events
    this.sizes.destroy();
    this.time.destroy();
    
    // Destroy world, objects, textures
    this.world.destroy();

    // Destroy core
    this.camera.destroy();
    this.renderer.destroy();
    this.sceneManager.destroy();

    delete window.experience;
  }
}
