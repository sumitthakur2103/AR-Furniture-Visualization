import { useEffect } from "react";
import "./App.css";
import * as THREE from "three";
import { ARButton } from "three/examples/jsm/webxr/ARButton";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { XREstimatedLight } from "three/examples/jsm/webxr/XREstimatedLight";

function App() {
  let reticle;
  let hitTestSource = null;
  let hitTestSourceRequested = false;

  let scene, camera, renderer;

  const models = [
    "./dylan_armchair_yolk_yellow.glb",
    "./ivan_armchair_mineral_blue.glb",
    "./marble_coffee_table.glb",
    "./flippa_functional_coffee_table_w._storagewalnut.glb",
    "./frame_armchairpetrol_velvet_with_gold_frame.glb",
    "./elnaz_nesting_side_tables_brass__green_marble.glb",
  ];

  const modelScaleFactor = [0.01, 0.01, 0.005, 0.01, 0.01, 0.01];

  let items = [];
  let itemSelectedIndex = 0;

  let controller;

  // Currently placed furniture
  let selectedModel = null;

  // Current scale of selected furniture
  let currentScale = 0.01;

  useEffect(() => {
    init();
    setupFurnitureSelection();
    setupARControls();
    animate();

    return () => {
      if (renderer) {
        renderer.setAnimationLoop(null);
      }
    };
  }, []);

  function init() {
    const myCanvas = document.getElementById("canvas");

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.01,
      20,
    );

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);

    light.position.set(0.5, 1, 0.25);
    scene.add(light);

    renderer = new THREE.WebGLRenderer({
      canvas: myCanvas,
      antialias: true,
      alpha: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.setClearColor(0x000000, 0);

    renderer.xr.enabled = true;

    // Estimated AR lighting
    const xrLight = new XREstimatedLight(renderer);

    xrLight.addEventListener("estimationstart", () => {
      scene.add(xrLight);
      scene.remove(light);

      if (xrLight.environment) {
        scene.environment = xrLight.environment;
      }
    });

    xrLight.addEventListener("estimationend", () => {
      scene.add(light);
      scene.remove(xrLight);
    });

    // AR Button
    const arButton = ARButton.createButton(renderer, {
      requiredFeatures: ["hit-test"],
      optionalFeatures: ["dom-overlay", "light-estimation"],
      domOverlay: {
        root: document.body,
      },
    });

    arButton.style.bottom = "20%";

    document.body.appendChild(arButton);

    // Load furniture models
    for (let i = 0; i < models.length; i++) {
      const loader = new GLTFLoader();

      loader.load(models[i], function (glb) {
        items[i] = glb.scene;
      });
    }

    // XR controller
    controller = renderer.xr.getController(0);

    controller.addEventListener("select", onSelect);

    scene.add(controller);

    // Placement reticle
    reticle = new THREE.Mesh(
      new THREE.RingGeometry(0.15, 0.2, 32).rotateX(-Math.PI / 2),

      new THREE.MeshBasicMaterial(),
    );

    reticle.matrixAutoUpdate = false;
    reticle.visible = false;

    scene.add(reticle);

    // Resize
    window.addEventListener("resize", onWindowResize);
  }

  function onWindowResize() {
    if (!camera || !renderer) return;

    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  // --------------------------------------------------
  // PLACE FURNITURE
  // --------------------------------------------------

  function onSelect() {
    if (!reticle.visible) return;

    if (!items[itemSelectedIndex]) {
      console.log("Furniture model not loaded yet");
      return;
    }

    const newModel = items[itemSelectedIndex].clone();

    newModel.visible = true;

    // Set position and rotation from reticle
    reticle.matrix.decompose(
      newModel.position,
      newModel.quaternion,
      newModel.scale,
    );

    const scaleFactor = modelScaleFactor[itemSelectedIndex];

    newModel.scale.set(scaleFactor, scaleFactor, scaleFactor);

    scene.add(newModel);

    // IMPORTANT:
    // This becomes the furniture controlled
    // by Rotate / Scale / Remove
    selectedModel = newModel;

    currentScale = scaleFactor;

    console.log("Furniture placed");
    console.log("Selected model:", selectedModel);
  }

  // --------------------------------------------------
  // ROTATE
  // --------------------------------------------------

  function rotateFurniture() {
    if (!selectedModel) {
      console.log("No furniture selected");
      return;
    }

    selectedModel.rotation.y += THREE.MathUtils.degToRad(30);

    console.log("Furniture rotated");
  }

  // --------------------------------------------------
  // SCALE UP
  // --------------------------------------------------

  function scaleUpFurniture() {
    if (!selectedModel) {
      console.log("No furniture selected");
      return;
    }

    currentScale *= 1.15;

    selectedModel.scale.set(currentScale, currentScale, currentScale);

    console.log("Scale increased:", currentScale);
  }

  // --------------------------------------------------
  // SCALE DOWN
  // --------------------------------------------------

  function scaleDownFurniture() {
    if (!selectedModel) {
      console.log("No furniture selected");
      return;
    }

    currentScale *= 0.85;

    // Prevent furniture from becoming too small
    currentScale = Math.max(currentScale, 0.003);

    selectedModel.scale.set(currentScale, currentScale, currentScale);

    console.log("Scale decreased:", currentScale);
  }

  // --------------------------------------------------
  // REMOVE
  // --------------------------------------------------

  function removeFurniture() {
    if (!selectedModel) {
      console.log("No furniture selected");
      return;
    }

    scene.remove(selectedModel);

    selectedModel = null;

    currentScale = 0.01;

    console.log("Furniture removed");
  }

  // --------------------------------------------------
  // FURNITURE SELECTION
  // --------------------------------------------------

  const onClicked = (e, selectItem, index) => {
    itemSelectedIndex = index;

    // Remove selection from all items
    for (let i = 0; i < models.length; i++) {
      const el = document.querySelector(`#item${i}`);

      if (el) {
        el.classList.remove("clicked");
      }
    }

    // Add selection to clicked item
    const currentElement = document.querySelector(`#item${index}`);

    if (currentElement) {
      currentElement.classList.add("clicked");
    }
  };

  function setupFurnitureSelection() {
    for (let i = 0; i < models.length; i++) {
      const el = document.querySelector(`#item${i}`);

      if (!el) continue;

      // Prevent furniture selection UI
      // from triggering AR placement
      el.addEventListener("beforexrselect", (e) => {
        e.preventDefault();
        e.stopPropagation();
      });

      el.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        onClicked(e, items[i], i);
      });
    }
  }

  // --------------------------------------------------
  // AR CONTROL BUTTONS
  // --------------------------------------------------

  function setupARControls() {
    const rotateButton = document.getElementById("rotateButton");

    const scaleUpButton = document.getElementById("scaleUpButton");

    const scaleDownButton = document.getElementById("scaleDownButton");

    const removeButton = document.getElementById("removeButton");

    if (rotateButton) {
      rotateButton.addEventListener("beforexrselect", (e) => {
        e.preventDefault();
        e.stopPropagation();
      });

      rotateButton.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        rotateFurniture();
      });
    }

    if (scaleUpButton) {
      scaleUpButton.addEventListener("beforexrselect", (e) => {
        e.preventDefault();
        e.stopPropagation();
      });

      scaleUpButton.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        scaleUpFurniture();
      });
    }

    if (scaleDownButton) {
      scaleDownButton.addEventListener("beforexrselect", (e) => {
        e.preventDefault();
        e.stopPropagation();
      });

      scaleDownButton.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        scaleDownFurniture();
      });
    }

    if (removeButton) {
      removeButton.addEventListener("beforexrselect", (e) => {
        e.preventDefault();
        e.stopPropagation();
      });

      removeButton.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        removeFurniture();
      });
    }
  }

  // --------------------------------------------------
  // ANIMATION
  // --------------------------------------------------

  function animate() {
    renderer.setAnimationLoop(render);
  }

  // --------------------------------------------------
  // AR RENDER
  // --------------------------------------------------

  function render(timestamp, frame) {
    if (frame) {
      const referenceSpace = renderer.xr.getReferenceSpace();

      const session = renderer.xr.getSession();

      if (hitTestSourceRequested === false) {
        session.requestReferenceSpace("viewer").then(function (referenceSpace) {
          session
            .requestHitTestSource({
              space: referenceSpace,
            })
            .then(function (source) {
              hitTestSource = source;
            });
        });

        session.addEventListener("end", function () {
          hitTestSourceRequested = false;
          hitTestSource = null;
        });

        hitTestSourceRequested = true;
      }

      if (hitTestSource) {
        const hitTestResults = frame.getHitTestResults(hitTestSource);

        if (hitTestResults.length) {
          const hit = hitTestResults[0];

          reticle.visible = true;

          reticle.matrix.fromArray(
            hit.getPose(referenceSpace).transform.matrix,
          );
        } else {
          reticle.visible = false;
        }
      }
    }

    renderer.render(scene, camera);
  }

  return (
    <div className="App">
      {/* AR FURNITURE CONTROLS */}
      <div className="ar-controls">
        <button id="rotateButton">
          ↻<span>Rotate</span>
        </button>

        <button id="scaleUpButton">
          ＋<span>Scale Up</span>
        </button>

        <button id="scaleDownButton">
          −<span>Scale Down</span>
        </button>

        <button id="removeButton">
          🗑
          <span>Remove</span>
        </button>
      </div>
    </div>
  );
}

export default App;
