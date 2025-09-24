import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function LiquidEther({ 
  colors = ['#5227FF', '#FF9FFC', '#B19EEF', '#61dafb'],
  mouseForce = 25,
  cursorSize = 120,
  autoDemo = true,
  autoSpeed = 0.3,
  autoIntensity = 1.8,
  className = "w-full h-full"
}) {
  const containerRef = useRef();
  const sceneRef = useRef();
  const rendererRef = useRef();
  const materialRef = useRef();
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Use orthographic camera to avoid fisheye effect
    const aspect = window.innerWidth / window.innerHeight;
    const frustumSize = 2;
    const camera = new THREE.OrthographicCamera(
      (frustumSize * aspect) / -2, // left
      (frustumSize * aspect) / 2,  // right
      frustumSize / 2,              // top
      frustumSize / -2,             // bottom
      0.1,                          // near
      1000                          // far
    );
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Shader material for liquid effect
    const vertexShader = `
      varying vec2 vUv;
      varying vec3 vPosition;
      uniform float uTime;
      uniform vec2 uMouse;
      uniform float uMouseForce;
      
      void main() {
        vUv = uv;
        vPosition = position;
        
        vec3 pos = position;
        
        // Create flowing liquid effect
        float wave1 = sin(pos.x * 2.0 + uTime * 2.0) * 0.1;
        float wave2 = cos(pos.y * 1.5 + uTime * 1.5) * 0.1;
        float wave3 = sin((pos.x + pos.y) * 1.0 + uTime * 3.0) * 0.05;
        
        pos.z += wave1 + wave2 + wave3;
        
        // Mouse interaction
        float mouseDistance = distance(pos.xy, uMouse);
        float mouseEffect = smoothstep(1.0, 0.0, mouseDistance) * uMouseForce;
        pos.z += mouseEffect * 0.5;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    const fragmentShader = `
      varying vec2 vUv;
      varying vec3 vPosition;
      uniform float uTime;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform vec3 uColor3;
      uniform vec3 uColor4;
      uniform vec2 uMouse;
      uniform float uMouseForce;
      
      vec3 hsv2rgb(vec3 c) {
        vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
      }
      
      void main() {
        vec2 uv = vUv;
        
        // Create flowing patterns
        float pattern1 = sin(uv.x * 10.0 + uTime * 2.0) * cos(uv.y * 8.0 + uTime * 1.5);
        float pattern2 = sin((uv.x + uv.y) * 6.0 + uTime * 3.0);
        float pattern3 = cos(uv.x * 4.0 - uTime * 1.0) * sin(uv.y * 5.0 + uTime * 2.5);
        
        float combined = (pattern1 + pattern2 + pattern3) * 0.33;
        
        // Mouse influence on colors
        float mouseDistance = distance(uv, uMouse);
        float mouseInfluence = 1.0 - smoothstep(0.0, 0.5, mouseDistance);
        
        // Color mixing
        float colorMix1 = (sin(combined + uTime) + 1.0) * 0.5;
        float colorMix2 = (cos(combined * 1.5 + uTime * 1.2) + 1.0) * 0.5;
        float colorMix3 = (sin(combined * 0.8 + uTime * 0.8) + 1.0) * 0.5;
        
        vec3 color1 = mix(uColor1, uColor2, colorMix1);
        vec3 color2 = mix(uColor3, uColor4, colorMix2);
        vec3 finalColor = mix(color1, color2, colorMix3);
        
        // Add shimmer effect
        float shimmer = sin(combined * 20.0 + uTime * 10.0) * 0.1 + 0.9;
        finalColor *= shimmer;
        
        // Add mouse interaction glow
        finalColor += mouseInfluence * 0.3;
        
        // Create liquid transparency
        float alpha = 0.8 + sin(combined * 5.0 + uTime * 2.0) * 0.2;
        alpha = clamp(alpha, 0.6, 1.0);
        
        gl_FragColor = vec4(finalColor, alpha);
      }
    `;

    // Convert hex colors to RGB
    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255
      } : {r: 1, g: 1, b: 1};
    };

    const rgbColors = colors.map(hexToRgb);

    // Create material
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uMouseForce: { value: mouseForce / 100 },
        uColor1: { value: new THREE.Vector3(rgbColors[0].r, rgbColors[0].g, rgbColors[0].b) },
        uColor2: { value: new THREE.Vector3(rgbColors[1].r, rgbColors[1].g, rgbColors[1].b) },
        uColor3: { value: new THREE.Vector3(rgbColors[2].r, rgbColors[2].g, rgbColors[2].b) },
        uColor4: { value: new THREE.Vector3(rgbColors[3].r, rgbColors[3].g, rgbColors[3].b) },
      },
      transparent: true,
      blending: THREE.AdditiveBlending
    });

    materialRef.current = material;

    // Create geometry that covers the full viewport
    const geometry = new THREE.PlaneGeometry(2 * aspect, 2, 100, 100);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Position camera (orthographic camera doesn't need z positioning for this effect)
    camera.position.z = 1;

    // Mouse tracking
    const handleMouseMove = (event) => {
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      if (materialRef.current) {
        materialRef.current.uniforms.uMouse.value.set(
          (mouseRef.current.x + 1) * 0.5,
          (mouseRef.current.y + 1) * 0.5
        );
      }
    };

    // Auto demo movement
    const updateAutoDemo = (time) => {
      if (autoDemo && materialRef.current) {
        const x = Math.sin(time * autoSpeed) * autoIntensity * 0.5;
        const y = Math.cos(time * autoSpeed * 0.7) * autoIntensity * 0.5;
        materialRef.current.uniforms.uMouse.value.set(
          (x + 1) * 0.5,
          (y + 1) * 0.5
        );
      }
    };

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      timeRef.current += 0.01;
      
      if (materialRef.current) {
        materialRef.current.uniforms.uTime.value = timeRef.current;
      }
      
      if (autoDemo) {
        updateAutoDemo(timeRef.current);
      }
      
      renderer.render(scene, camera);
    };

    // Handle resize
    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const height = containerRef.current.offsetHeight;
        const newAspect = width / height;
        
        // Update orthographic camera frustum
        const frustumSize = 2;
        camera.left = (frustumSize * newAspect) / -2;
        camera.right = (frustumSize * newAspect) / 2;
        camera.top = frustumSize / 2;
        camera.bottom = frustumSize / -2;
        
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        
        // Update geometry to maintain full coverage
        const mesh = scene.children[0];
        if (mesh && mesh.geometry) {
          mesh.geometry.dispose();
          mesh.geometry = new THREE.PlaneGeometry(2 * newAspect, 2, 100, 100);
        }
      }
    };

    // Event listeners
    if (!autoDemo) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    window.addEventListener('resize', handleResize);

    // Start animation
    animate();

    // Cleanup
    return () => {
      const currentContainer = containerRef.current;
      
      if (!autoDemo) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      window.removeEventListener('resize', handleResize);
      
      if (currentContainer && renderer.domElement) {
        currentContainer.removeChild(renderer.domElement);
      }
      
      // Dispose of Three.js objects
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [colors, mouseForce, cursorSize, autoDemo, autoSpeed, autoIntensity]);

  return <div ref={containerRef} className={className} style={{ background: 'transparent' }} />;
}