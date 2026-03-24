import * as THREE from "three";

export default class SceneManager {
  constructor() {
    this.instance = new THREE.Scene();
  }

  destroy() {
    this.instance.traverse((child) => {
      // Test if it's a mesh
      if (child instanceof THREE.Mesh) {
        if (child.geometry) child.geometry.dispose();

        // Loop through the material properties
        if (child.material) {
          // We only care about arrays or singles
          if (child.material.length) {
            for (const material of child.material) {
              if (material.map) material.map.dispose();
              material.dispose();
            }
          } else {
            if (child.material.map) child.material.map.dispose();
            child.material.dispose();
          }
        }
      }
    });

    // Remove children
    while (this.instance.children.length > 0) {
      this.instance.remove(this.instance.children[0]);
    }
  }
}
