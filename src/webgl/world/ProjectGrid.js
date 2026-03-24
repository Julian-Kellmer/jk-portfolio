import * as THREE from "three";
import ProjectCard from "./ProjectCard";
import { wrap } from "../math/wrap";

export default class ProjectGrid {
  constructor(experience, galleryData) {
    this.experience = experience;
    this.scene = this.experience.scene;
    this.galleryData = galleryData;

    this.cards = [];
    this.meshesForRaycast = [];

    // Grid configuration
    this.columns = 11;
    this.rows = 11;
    // 16:9
    this.planeWidth = 4.26;
    this.planeHeight = 2.2;
    this.gapX = 2.0;
    this.gapY = 0.5;

    this.totalWidth = this.columns * (this.planeWidth + this.gapX);
    this.totalHeight = this.rows * (this.planeHeight + this.gapY);

    // Reusable geometry for all cards to save memory
    this.geometry = new THREE.PlaneGeometry(this.planeWidth, this.planeHeight, 32, 32);

    // ─── Cylindrical projection parameters ────────────────────────────────────
    // Model: the gallery lies on the inside surface of a vertical cylinder.
    // The camera is at the cylinder axis looking forward.
    this.sphereParams = {
      // Arc angle strength: how many radians the edge cards rotate.
      // 0.6 rad ≈ 34° total sweep across the visible width. Subtle but clear.
      curvatureStrength:    0.6,

      // Radius of the virtual cylinder in world units.
      // Larger = wider cylinder = less Z recession for the same angle.
      sphereRadius:         12,

      // Normalization ranges — define what counts as "edge" (= nx/ny of ±1).
      // Should be slightly wider than the visible world area at Z=0.
      lensRadiusX:          10.0,
      lensRadiusY:           6.0,

      // Independent vertical tilt — keeps top/bottom cards from feeling flat.
      // Very small value; 0.04 rad ≈ 2.3° at the top/bottom edge.
      verticalTiltStrength: 0.04,
    };
    // ──────────────────────────────────────────────────────────────────────────

    this.setGrid();
  }

  setGrid() {
    let dataIndex = 0;

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.columns; col++) {
        // Cycle through mock data if not enough
        const data = this.galleryData[dataIndex % this.galleryData.length];
        
        const card = new ProjectCard(data, dataIndex, this.geometry, {
          planeWidth: this.planeWidth,
          planeHeight: this.planeHeight
        });

        // Calculate base grid layout centered around 0,0
        const posX = (col - this.columns / 2 + 0.5) * (this.planeWidth + this.gapX);
        const posY = (row - this.rows / 2 + 0.5) * (this.planeHeight + this.gapY);

        card.basePosition.set(posX, posY, 0);

        this.scene.add(card.mesh);
        this.cards.push(card);
        this.meshesForRaycast.push(card.mesh);

        dataIndex++;
      }
    }
  }

  update(currentOffset, velocity, time) {
    // Note: To match drag gestures correctly:
    // Dragging right makes offset positive, cards need to move right.
    // Dragging down makes offset positive, cards need to move down (negative Y on screen is down for THREE, so we negate currentOffset.y)
    
    const globalOffset = {
      x: currentOffset.x * 0.005, // Scaling down pixel values to Three.js units
      y: -currentOffset.y * 0.005
    };

    const shaderVelocity = {
      x: velocity.x * 0.005,
      y: -velocity.y * 0.005
    }

    for (const card of this.cards) {
      card.update(
        globalOffset,
        this.totalWidth,
        this.totalHeight,
        wrap,
        shaderVelocity,
        time,
        this.sphereParams   // ← sphere curvature
      );
    }
  }

  destroy() {
    this.geometry.dispose();
    for (const card of this.cards) {
      this.scene.remove(card.mesh);
      card.destroy();
    }
  }
}
