import ProjectGrid from "./ProjectGrid";
import InputController from "../interaction/InputController";
import RaycastController from "../interaction/RaycastController";

export default class GalleryWorld {
  constructor(experience, data = []) {
    this.experience = experience;

    // Controllers
    this.inputController = new InputController();
    this.raycastController = new RaycastController(this.experience);

    // Build the Grid
    this.projectGrid = new ProjectGrid(this.experience, data);

    // Setup events
    this.setupEvents();
  }

  setupEvents() {
    this.raycastController.on("pointerenter", (mesh) => {
      const card = mesh.userData.component;
      if (card) card.onPointerEnter();
    });

    this.raycastController.on("pointerleave", (mesh) => {
      const card = mesh.userData.component;
      if (card) card.onPointerLeave();
    });
  }

  update() {
    // 1. Update Input (Lerp target offset to current offset)
    this.inputController.update();

    // 2. Update Grid
    this.projectGrid.update(
      this.inputController.current,
      this.inputController.velocity,
      this.experience.time.elapsed * 0.001
    );

    // 3. Update Raycast
    this.raycastController.update(this.projectGrid.meshesForRaycast);
  }

  destroy() {
    this.inputController.destroy();
    this.raycastController.destroy();
    this.projectGrid.destroy();
  }
}
