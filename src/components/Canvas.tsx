import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const Canvas = ({ style }: { style?: React.CSSProperties }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const dimensionsRef = useRef({ width: window.innerWidth, height: window.innerHeight });
  const animationFrameRef = useRef<number | null>(null);

  /**
   * =====================
   * CONFIGURABLE CONSTANTS
   * =====================
   */
  const MAX_SPEED = 0.5;
  const MAX_FORCE = 0.05;
  const NEIGHBOR_RADIUS = 80;
  const SEPARATION_RADIUS = 30;
  const MOUSE_RADIUS = 200;
  const ALIGNMENT_WEIGHT = 0.01;
  const COHESION_WEIGHT = 0.001;
  const SEPARATION_WEIGHT = 0.15;
  const MOUSE_WEIGHT = 2;
  const PARTICLE_SIZE = 2;
  const DENSITY_FACTOR = 0.00008; // particles per pixel²
  const RESIZE_DEBOUNCE = 200;    // ms to wait after resize stops

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    // Helper to update canvas size + dimensions ref
    const setCanvasSize = (w: number, h: number) => {
      dimensionsRef.current = { width: w, height: h };
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Helper to limit values
    const limit = (value: number, max: number) => Math.max(Math.min(value, max), -max);

    // Compute boids forces
    const computeForces = (p: Particle, particles: Particle[]) => {
      let ax = 0;
      let ay = 0;

      let avgVX = 0;
      let avgVY = 0;
      let centerX = 0;
      let centerY = 0;
      let count = 0;

      for (let other of particles) {
        if (other === p) continue;
        const dx = other.x - p.x;
        const dy = other.y - p.y;
        const dist = Math.hypot(dx, dy);

        if (dist < NEIGHBOR_RADIUS) {
          centerX += other.x;
          centerY += other.y;
          avgVX += other.vx;
          avgVY += other.vy;
          count++;

          if (dist < SEPARATION_RADIUS) {
            ax -= (dx / dist) * SEPARATION_WEIGHT;
            ay -= (dy / dist) * SEPARATION_WEIGHT;
          }
        }
      }

      if (count > 0) {
        centerX /= count;
        centerY /= count;
        ax += (centerX - p.x) * COHESION_WEIGHT;
        ay += (centerY - p.y) * COHESION_WEIGHT;

        avgVX /= count;
        avgVY /= count;
        ax += (avgVX - p.vx) * ALIGNMENT_WEIGHT;
        ay += (avgVY - p.vy) * ALIGNMENT_WEIGHT;
      }

      // Mouse repulsion
      const dxm = p.x - mouseRef.current.x;
      const dym = p.y - mouseRef.current.y;
      const distMouse = Math.hypot(dxm, dym);
      if (distMouse < MOUSE_RADIUS && distMouse > 0) {
        const force = MOUSE_WEIGHT * (1 - distMouse / MOUSE_RADIUS);
        ax += (dxm / distMouse) * force;
        ay += (dym / distMouse) * force;
      }

      ax = limit(ax, MAX_FORCE);
      ay = limit(ay, MAX_FORCE);

      return { ax, ay };
    };

    // Initialize or reset particles
    const initParticles = (w: number, h: number) => {
      const numParticles = Math.floor(w * h * DENSITY_FACTOR);
      particlesRef.current = Array.from({ length: numParticles }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * MAX_SPEED * 2,
        vy: (Math.random() - 0.5) * MAX_SPEED * 2,
      }));
    };

    // Initial setup
    setCanvasSize(window.innerWidth, window.innerHeight);
    initParticles(window.innerWidth, window.innerHeight);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Debounced resize handler
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      // Quick black fill during resize
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;
        setCanvasSize(newWidth, newHeight);
        initParticles(newWidth, newHeight); // full reset → fills new area
      }, RESIZE_DEBOUNCE);
    };
    window.addEventListener("resize", handleResize);

    // Animation loop
    const animate = () => {
      const { width, height } = dimensionsRef.current;

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, width, height);

      for (let p of particlesRef.current) {
        const { ax, ay } = computeForces(p, particlesRef.current);

        p.vx += ax;
        p.vy += ay;

        const speed = Math.hypot(p.vx, p.vy);
        if (speed > MAX_SPEED) {
          p.vx = (p.vx / speed) * MAX_SPEED;
          p.vy = (p.vy / speed) * MAX_SPEED;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Toroidal wrapping using CURRENT dimensions
        if (p.x < 0) p.x += width;
        if (p.x > width) p.x -= width;
        if (p.y < 0) p.y += height;
        if (p.y > height) p.y -= height;

        ctx.fillStyle = "#333333";
        ctx.beginPath();
        ctx.arc(p.x, p.y, PARTICLE_SIZE, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} style={style} />;
};

export default Canvas;
