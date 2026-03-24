import EventEmitter from "events";

export default class Sizes extends EventEmitter {
  constructor(canvas) {
    super();

    // The canvas or container
    this.canvas = canvas;

    // Initial setup
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);

    // Resize event
    this.resizeListener = () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.pixelRatio = Math.min(window.devicePixelRatio, 2);

      this.emit("resize");
    };

    window.addEventListener("resize", this.resizeListener);
  }

  destroy() {
    window.removeEventListener("resize", this.resizeListener);
    this.removeAllListeners();
  }
}
