'use client';

import { useEffect, useRef } from 'react';

interface RubikCubeProps {
  size?: number;
  className?: string;
}

export default function RubikCube({ size = 200, className = '' }: RubikCubeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = size;
    canvas.height = size;

    let rotationX = 0;
    let rotationY = 0;
    let rotationZ = 0;

    // Rubik's cube colors
    const colors = {
      front: '#ff6b6b',   // Red
      back: '#ffa500',    // Orange
      left: '#4ecdc4',    // Teal
      right: '#45b7d1',   // Blue
      top: '#96ceb4',     // Green
      bottom: '#ffeaa7'   // Yellow
    };

    // 3D point projection
    const project3D = (x: number, y: number, z: number) => {
      const distance = 400;
      const scale = distance / (distance + z);
      return {
        x: x * scale + size / 2,
        y: y * scale + size / 2,
        scale
      };
    };

    // Rotate point around X axis
    const rotateX = (x: number, y: number, z: number, angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return {
        x,
        y: y * cos - z * sin,
        z: y * sin + z * cos
      };
    };

    // Rotate point around Y axis
    const rotateY = (x: number, y: number, z: number, angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return {
        x: x * cos + z * sin,
        y,
        z: -x * sin + z * cos
      };
    };

    // Rotate point around Z axis
    const rotateZ = (x: number, y: number, z: number, angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return {
        x: x * cos - y * sin,
        y: x * sin + y * cos,
        z
      };
    };

    // Draw a face of the cube
    const drawFace = (vertices: any[], color: string, alpha: number = 1) => {
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;

      ctx.beginPath();
      const firstPoint = project3D(vertices[0].x, vertices[0].y, vertices[0].z);
      ctx.moveTo(firstPoint.x, firstPoint.y);

      for (let i = 1; i < vertices.length; i++) {
        const point = project3D(vertices[i].x, vertices[i].y, vertices[i].z);
        ctx.lineTo(point.x, point.y);
      }

      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.globalAlpha = 1;
    };

    // Draw individual cube
    const drawCube = (offsetX: number, offsetY: number, offsetZ: number, cubeSize: number) => {
      const half = cubeSize / 2;
      
      // Define cube vertices
      let vertices = [
        // Front face
        { x: offsetX - half, y: offsetY - half, z: offsetZ + half },
        { x: offsetX + half, y: offsetY - half, z: offsetZ + half },
        { x: offsetX + half, y: offsetY + half, z: offsetZ + half },
        { x: offsetX - half, y: offsetY + half, z: offsetZ + half },
        // Back face
        { x: offsetX - half, y: offsetY - half, z: offsetZ - half },
        { x: offsetX + half, y: offsetY - half, z: offsetZ - half },
        { x: offsetX + half, y: offsetY + half, z: offsetZ - half },
        { x: offsetX - half, y: offsetY + half, z: offsetZ - half }
      ];

      // Apply rotations
      vertices = vertices.map(v => {
        let rotated = rotateX(v.x, v.y, v.z, rotationX);
        rotated = rotateY(rotated.x, rotated.y, rotated.z, rotationY);
        rotated = rotateZ(rotated.x, rotated.y, rotated.z, rotationZ);
        return rotated;
      });

      // Calculate face centers for depth sorting
      const faces = [
        { vertices: [vertices[0], vertices[1], vertices[2], vertices[3]], color: colors.front, name: 'front' },
        { vertices: [vertices[5], vertices[4], vertices[7], vertices[6]], color: colors.back, name: 'back' },
        { vertices: [vertices[4], vertices[0], vertices[3], vertices[7]], color: colors.left, name: 'left' },
        { vertices: [vertices[1], vertices[5], vertices[6], vertices[2]], color: colors.right, name: 'right' },
        { vertices: [vertices[3], vertices[2], vertices[6], vertices[7]], color: colors.top, name: 'top' },
        { vertices: [vertices[4], vertices[5], vertices[1], vertices[0]], color: colors.bottom, name: 'bottom' }
      ];

      // Calculate average Z for each face (for depth sorting)
      faces.forEach(face => {
        const avgZ = face.vertices.reduce((sum, v) => sum + v.z, 0) / 4;
        (face as any).avgZ = avgZ;
      });

      // Sort faces by depth (back to front)
      faces.sort((a, b) => (a as any).avgZ - (b as any).avgZ);

      // Draw faces
      faces.forEach(face => {
        const alpha = (face as any).avgZ > 0 ? 0.8 : 1;
        drawFace(face.vertices, face.color, alpha);
      });
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, size, size);

      // Update rotations
      rotationX += 0.01;
      rotationY += 0.015;
      rotationZ += 0.008;

      const cubeSize = 25;
      const spacing = 30;

      // Draw 3x3x3 Rubik's cube
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          for (let z = -1; z <= 1; z++) {
            drawCube(x * spacing, y * spacing, z * spacing, cubeSize);
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      className={`${className}`}
      style={{ 
        width: size, 
        height: size,
        filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3))'
      }}
    />
  );
}