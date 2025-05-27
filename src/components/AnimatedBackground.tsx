
import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  vx: number;
  vy: number;
  targetX?: number;
  targetY?: number;
  life: number; // Time to live or time to reach target
  maxLife: number;
  isReturning?: boolean; // For a more complex path later
}

interface StaticNode {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
}

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const staticNodesRef = useRef<StaticNode[]>([]);
  const animationFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const initOrUpdateCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight; // Cover entire scrollable area

      // Initialize Static Nodes
      staticNodesRef.current = [];
      const nodeCount = Math.floor((canvas.width * Math.min(window.innerHeight * 2, canvas.height)) / 20000); // Density based on viewport / initial screen
      for (let i = 0; i < nodeCount; i++) {
        staticNodesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          baseOpacity: Math.random() * 0.1 + 0.05, // Very subtle base
        });
      }

      // Initialize Particles
      particlesRef.current = [];
      const particleCount = Math.min(60, Math.floor(staticNodesRef.current.length * 0.5)); // Max 60 particles or half of nodes
      for (let i = 0; i < particleCount; i++) {
        createParticle(true); // isInitial = true
      }
    };
    
    const selectRandomNode = (): StaticNode | undefined => {
        if (staticNodesRef.current.length === 0) return undefined;
        return staticNodesRef.current[Math.floor(Math.random() * staticNodesRef.current.length)];
    }

    const createParticle = (isInitial: boolean = false) => {
      const startNode = selectRandomNode();
      if (!startNode) return;

      const newParticle: Particle = {
        x: startNode.x,
        y: startNode.y,
        size: Math.random() * 2.5 + 1,
        opacity: Math.random() * 0.6 + 0.4,
        vx: 0, // Will be set based on target
        vy: 0, // Will be set based on target
        life: Math.random() * 150 + 100, // Frames to reach target
        maxLife: 0, // Will be set
      };
      newParticle.maxLife = newParticle.life;
      assignTarget(newParticle);
      particlesRef.current.push(newParticle);
    };
    
    const assignTarget = (p: Particle) => {
        const targetNode = selectRandomNode();
        if (targetNode) {
            p.targetX = targetNode.x;
            p.targetY = targetNode.y;
            const dx = p.targetX - p.x;
            const dy = p.targetY - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const speedFactor = Math.random() * 0.5 + 0.3; // Slower overall movement
            p.vx = (dx / dist) * speedFactor;
            p.vy = (dy / dist) * speedFactor;
            p.life = dist / speedFactor; // Adjust life to time taken to reach target
            if (p.life < 50) p.life = 50; // Minimum life
            p.maxLife = p.life;
        } else { // No target, just drift
            p.vx = (Math.random() - 0.5) * 0.3;
            p.vy = (Math.random() - 0.5) * 0.3;
            p.life = Math.random() * 200 + 100;
            p.maxLife = p.life;
        }
    };


    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const viewTop = scrollTop;
      const viewBottom = scrollTop + window.innerHeight;


      // Draw static nodes (only those in/near view for performance)
      staticNodesRef.current.forEach(node => {
        if (node.y > viewTop - 100 && node.y < viewBottom + 100) { // Render a bit outside viewport
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 255, 80, ${node.baseOpacity})`;
            ctx.shadowColor = 'rgba(0, 255, 80, 0.3)';
            ctx.shadowBlur = 2 + node.size;
            ctx.fill();
        }
      });
      ctx.shadowBlur = 0;

      // Draw and update moving particles
      particlesRef.current.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        
        // Fade out particle as it nears end of life
        p.opacity = (p.life / p.maxLife) * 0.7 + 0.3;
        if (p.opacity < 0) p.opacity = 0;


        if (p.life <= 0 || p.x < -p.size || p.x > canvas.width + p.size || p.y < -p.size || p.y > canvas.height + p.size) {
          // Respawn particle
          const startNode = selectRandomNode();
          if (startNode) {
              p.x = startNode.x;
              p.y = startNode.y;
              p.size = Math.random() * 2.5 + 1;
              assignTarget(p);
          } else {
              particlesRef.current.splice(index, 1); // Remove if no node
          }
        } else {
          // Only draw if in/near view
          if (p.y > viewTop - 50 && p.y < viewBottom + 50) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(50, 255, 150, ${p.opacity})`;
            ctx.shadowColor = `rgba(100, 255, 180, ${p.opacity * 1.2})`;
            ctx.shadowBlur = 4 + p.size * 1.5;
            ctx.fill();
          }
        }
      });
      ctx.shadowBlur = 0;

      animationFrameIdRef.current = requestAnimationFrame(draw);
    };
    
    initOrUpdateCanvas();
    
    // Debounced resize handler
    // FIX: Changed type of resizeTimeout from NodeJS.Timeout to number for browser compatibility.
    let resizeTimeout: number;
    const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = window.setTimeout(() => {
            if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
            initOrUpdateCanvas(); // Re-initialize everything on resize for simplicity
            draw();
        }, 250);
    };

    window.addEventListener('resize', handleResize);
    // Also update canvas height on scroll if document height changes dynamically (less common)
    // For now, height is set once on init and resize covering full document scroll height

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      clearTimeout(resizeTimeout);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-auto -z-20" />; // z-index adjusted
};

export default AnimatedBackground;