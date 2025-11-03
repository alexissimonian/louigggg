<script lang="ts">
  import { onMount } from "svelte";
  import * as THREE from "three";
  import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

  let canvas: HTMLCanvasElement;
  let model: THREE.Group;
  let scrollProgress = 0;
  let virtualScroll = 0; // Virtual scroll position
  let targetVirtualScroll = 0; // Target for smooth interpolation
  const FLIP_DURATION = 800; // Scroll amount needed to complete flip
  const LERP_FACTOR = 0.15; // Smoothing factor (lower = smoother but slower)

  onMount(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap pixel ratio for performance

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Load GLB model
    const loader = new GLTFLoader();
    loader.load(
      "https://images.alexissimonian.net/textured_plate_ceramic_final.glb",
      (gltf) => {
        model = gltf.scene;
        scene.add(model);

        // Center and scale the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);

        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 4 / maxDim;
        model.scale.setScalar(scale);

        // Start with plate facing the camera (rotated 90 degrees on X axis)
        model.rotation.x = -Math.PI / 2;
      },
      undefined,
      (error) => {
        console.error("Error loading model:", error);
      },
    );

    camera.position.z = 3;

    // Handle wheel events to control virtual scroll and rotation
    const handleWheel = (e: WheelEvent) => {
      const currentScroll = window.scrollY;
      const newTargetScroll = targetVirtualScroll + e.deltaY;

      // Check if we're at the top and scrolling down into flip range
      if (
        currentScroll === 0 &&
        e.deltaY > 0 &&
        targetVirtualScroll < FLIP_DURATION
      ) {
        e.preventDefault();
        targetVirtualScroll = Math.max(
          0,
          Math.min(FLIP_DURATION, newTargetScroll),
        );
      }
      // If scrolling back up to the top into flip range
      else if (currentScroll === 0 && e.deltaY < 0 && targetVirtualScroll > 0) {
        e.preventDefault();
        targetVirtualScroll = Math.max(0, newTargetScroll);
      }
      // Normal page scrolling - sync virtual scroll
      else if (currentScroll > 0) {
        targetVirtualScroll = FLIP_DURATION;
        virtualScroll = FLIP_DURATION;
      }
      // At top with flip complete, allow natural scroll
      else if (
        currentScroll === 0 &&
        targetVirtualScroll >= FLIP_DURATION &&
        e.deltaY > 0
      ) {
        // Don't prevent - let it scroll naturally
        targetVirtualScroll = FLIP_DURATION;
        virtualScroll = FLIP_DURATION;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    // Handle resize
    const handleResize = () => {
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);

      // Smooth interpolation (lerp) between current and target
      virtualScroll += (targetVirtualScroll - virtualScroll) * LERP_FACTOR;

      // Calculate scroll progress in the animation loop (60fps)
      scrollProgress = virtualScroll / FLIP_DURATION;

      if (model) {
        // Start at 90° (facing camera) and rotate -180° to end at -90° (facing away)
        model.rotation.x = Math.PI / 2 - scrollProgress * Math.PI;
      }

      renderer.render(scene, camera);
    }

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", handleResize);
      document.body.style.overflow = "auto";
      renderer.dispose();
    };
  });
</script>

<svelte:head>
  <title>Louigggg - Vaisselle faite main</title>
</svelte:head>

<header>
  <canvas bind:this={canvas}></canvas>
</header>

<main>
  <p>Scroll to see the plate rotate</p>
  <p style="height: 200vh;">More content here...</p>
</main>

<style lang="scss">
  header {
    background-color: $color-black;
    height: 80dvh;
    position: relative;
    overflow: hidden;
  }

  canvas {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
