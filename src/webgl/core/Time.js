import EventEmitter from "events";

export default class Time extends EventEmitter {
  constructor() {
    super();

    // Setup
    this.start = Date.now();
    this.current = this.start;
    this.elapsed = 0;
    this.delta = 16;
    this.animationFrameId = null;

    this.tick = this.tick.bind(this);
    this.animationFrameId = window.requestAnimationFrame(this.tick);
  }

  tick() {
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsed = this.current - this.start;

    this.emit("tick");

    this.animationFrameId = window.requestAnimationFrame(this.tick);
  }

  destroy() {
    if (this.animationFrameId) {
      window.cancelAnimationFrame(this.animationFrameId);
    }
    this.removeAllListeners();
  }
}
