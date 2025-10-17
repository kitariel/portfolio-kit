'use client'

import { useEffect, useRef, useState } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  life: number
  maxLife: number
  type?: 'normal' | 'react'
}

interface Connection {
  x1: number
  y1: number
  x2: number
  y2: number
  opacity: number
}

interface ReactSymbol {
  x: number
  y: number
  vx: number
  vy: number
  rotation: number
  rotationSpeed: number
  size: number
  opacity: number
  life: number
  maxLife: number
}

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const mouseRef = useRef({ x: 0, y: 0 })
  const particlesRef = useRef<Particle[]>([])
  const connectionsRef = useRef<Connection[]>([])
  const reactSymbolsRef = useRef<ReactSymbol[]>([])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = dimensions.width
    canvas.height = dimensions.height

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = []
      const particleCount = Math.min(150, Math.floor((dimensions.width * dimensions.height) / 8000))
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * dimensions.width,
          y: Math.random() * dimensions.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2,
          life: 0,
          maxLife: Math.random() * 200 + 100,
        })
      }
    }

    const createMouseParticles = (mouseX: number, mouseY: number) => {
      const particleCount = 3
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5
        const speed = Math.random() * 2 + 1
        const distance = Math.random() * 30 + 10
        
        particlesRef.current.push({
          x: mouseX + Math.cos(angle) * distance,
          y: mouseY + Math.sin(angle) * distance,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 3 + 2,
          opacity: 0.8,
          life: 0,
          maxLife: 60,
          type: 'normal'
        })
      }
    }

    const createReactSymbol = (mouseX: number, mouseY: number) => {
      const angle = Math.random() * Math.PI * 2
      const speed = Math.random() * 3 + 2
      const distance = Math.random() * 40 + 20
      
      reactSymbolsRef.current.push({
        x: mouseX + Math.cos(angle) * distance,
        y: mouseY + Math.sin(angle) * distance,
        vx: Math.cos(angle) * speed * 0.5,
        vy: Math.sin(angle) * speed * 0.5,
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 20 + 15,
        opacity: 1,
        life: 0,
        maxLife: 120
      })
    }

    const updateReactSymbols = () => {
      reactSymbolsRef.current = reactSymbolsRef.current.filter(symbol => {
        symbol.x += symbol.vx
        symbol.y += symbol.vy
        symbol.rotation += symbol.rotationSpeed
        symbol.life++
        
        // Slow down over time
        symbol.vx *= 0.98
        symbol.vy *= 0.98
        
        // Fade out over time
        symbol.opacity = Math.max(0, 1 - (symbol.life / symbol.maxLife))
        
        return symbol.life < symbol.maxLife && symbol.opacity > 0.01
      })
    }

    const drawReactSymbol = (ctx: CanvasRenderingContext2D, symbol: ReactSymbol) => {
      ctx.save()
      ctx.translate(symbol.x, symbol.y)
      ctx.rotate(symbol.rotation)
      ctx.globalAlpha = symbol.opacity
      
      const size = symbol.size
      
      // React logo colors
      const reactBlue = `rgba(97, 218, 251, ${symbol.opacity})`
      
      // Draw React atom symbol
      ctx.strokeStyle = reactBlue
      ctx.lineWidth = 2
      
      // Center dot
      ctx.beginPath()
      ctx.arc(0, 0, size * 0.1, 0, Math.PI * 2)
      ctx.fillStyle = reactBlue
      ctx.fill()
      
      // Three ellipses
      for (let i = 0; i < 3; i++) {
        ctx.save()
        ctx.rotate((i * Math.PI * 2) / 3)
        
        // Ellipse
        ctx.beginPath()
        ctx.ellipse(0, 0, size * 0.8, size * 0.3, 0, 0, Math.PI * 2)
        ctx.stroke()
        
        // Electrons
        const electronAngle = symbol.rotation * 2 + (i * Math.PI * 2) / 3
        const electronX = Math.cos(electronAngle) * size * 0.8
        const electronY = Math.sin(electronAngle) * size * 0.3
        
        ctx.beginPath()
        ctx.arc(electronX, electronY, size * 0.05, 0, Math.PI * 2)
        ctx.fillStyle = reactBlue
        ctx.fill()
        
        ctx.restore()
      }
      
      ctx.restore()
    }

    const updateParticles = () => {
      particlesRef.current = particlesRef.current.filter(particle => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life++
        
        // Fade out over time
        particle.opacity = Math.max(0, particle.opacity - 0.005)
        
        // Boundary wrapping for ambient particles
        if (particle.life < particle.maxLife * 0.8) {
          if (particle.x < 0) particle.x = dimensions.width
          if (particle.x > dimensions.width) particle.x = 0
          if (particle.y < 0) particle.y = dimensions.height
          if (particle.y > dimensions.height) particle.y = 0
        }
        
        return particle.life < particle.maxLife && particle.opacity > 0.01
      })
    }

    const updateConnections = () => {
      connectionsRef.current = []
      const maxDistance = 120
      const mouseInfluence = 80
      
      // Mouse connections
      particlesRef.current.forEach(particle => {
        const dx = particle.x - mouseRef.current.x
        const dy = particle.y - mouseRef.current.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < mouseInfluence) {
          const opacity = (1 - distance / mouseInfluence) * 0.6
          connectionsRef.current.push({
            x1: mouseRef.current.x,
            y1: mouseRef.current.y,
            x2: particle.x,
            y2: particle.y,
            opacity,
          })
        }
      })
      
      // Particle to particle connections
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i]
          const p2 = particlesRef.current[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.2
            connectionsRef.current.push({
              x1: p1.x,
              y1: p1.y,
              x2: p2.x,
              y2: p2.y,
              opacity,
            })
          }
        }
      }
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(11, 14, 26, 0.1)'
      ctx.fillRect(0, 0, dimensions.width, dimensions.height)
      
      // Draw React symbols
      reactSymbolsRef.current.forEach(symbol => {
        drawReactSymbol(ctx, symbol)
      })
      
      // Draw connections
      connectionsRef.current.forEach(connection => {
        ctx.beginPath()
        ctx.moveTo(connection.x1, connection.y1)
        ctx.lineTo(connection.x2, connection.y2)
        ctx.strokeStyle = `rgba(59, 130, 246, ${connection.opacity})`
        ctx.lineWidth = 1
        ctx.stroke()
      })
      
      // Draw particles
      particlesRef.current.forEach(particle => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`
        ctx.fill()
        
        // Add glow effect
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity * 0.2})`
        ctx.fill()
      })
      
      // Draw mouse glow
      const gradient = ctx.createRadialGradient(
        mouseRef.current.x, mouseRef.current.y, 0,
        mouseRef.current.x, mouseRef.current.y, 50
      )
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)')
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0)')
      
      ctx.beginPath()
      ctx.arc(mouseRef.current.x, mouseRef.current.y, 50, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()
    }

    const animate = () => {
      updateParticles()
      updateReactSymbols()
      updateConnections()
      draw()
      animationRef.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
      
      // Create particles on mouse movement
      if (Math.random() < 0.3) {
        createMouseParticles(mouseRef.current.x, mouseRef.current.y)
      }
      
      // Create React symbols on mouse movement (less frequent)
      if (Math.random() < 0.15) {
        createReactSymbol(mouseRef.current.x, mouseRef.current.y)
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current.x = -100
      mouseRef.current.y = -100
    }

    initParticles()
    animate()

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [dimensions])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  )
}