'use client'

import { useEffect, useRef, useState } from 'react'

export function AnimatedCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const [isPointer, setIsPointer] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    if (!cursor || !cursorDot) return

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0
    let dotX = 0
    let dotY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const handleMouseDown = () => {
      setIsClicking(true)
    }

    const handleMouseUp = () => {
      setIsClicking(false)
    }

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.style.cursor === 'pointer' || target.closest('button') || target.closest('a')) {
        setIsPointer(true)
      }
    }

    const handleMouseLeave = () => {
      setIsPointer(false)
    }

    const animateCursor = () => {
      // Smooth following animation with different speeds
      cursorX += (mouseX - cursorX) * 0.1
      cursorY += (mouseY - cursorY) * 0.1
      dotX += (mouseX - dotX) * 0.3
      dotY += (mouseY - dotY) * 0.3

      cursor.style.transform = `translate3d(${cursorX - 20}px, ${cursorY - 20}px, 0)`
      cursorDot.style.transform = `translate3d(${dotX - 4}px, ${dotY - 4}px, 0)`

      requestAnimationFrame(animateCursor)
    }

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseover', handleMouseEnter)
    document.addEventListener('mouseout', handleMouseLeave)

    // Start animation
    animateCursor()

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseover', handleMouseEnter)
      document.removeEventListener('mouseout', handleMouseLeave)
    }
  }, [])

  return (
    <>
      {/* Main cursor ring */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-10 h-10 pointer-events-none z-[9999] transition-all duration-300 ease-out ${
          isPointer ? 'scale-150' : 'scale-100'
        } ${isClicking ? 'scale-75' : ''}`}
        style={{
          mixBlendMode: 'difference',
        }}
      >
        <div className="w-full h-full border-2 border-white rounded-full animate-pulse" />
      </div>

      {/* Cursor dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 w-2 h-2 pointer-events-none z-[9999] transition-all duration-150 ease-out ${
          isPointer ? 'scale-200 bg-blue-400' : 'scale-100 bg-white'
        } ${isClicking ? 'scale-150' : ''}`}
        style={{
          borderRadius: '50%',
          mixBlendMode: 'difference',
        }}
      />

      {/* Trailing particles */}
      <div className="fixed top-0 left-0 pointer-events-none z-[9998]">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-60"
            style={{
              animation: `cursorTrail 1s infinite ${i * 0.1}s`,
              mixBlendMode: 'screen',
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes cursorTrail {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.3;
          }
          100% {
            transform: scale(0);
            opacity: 0;
          }
        }
      `}</style>
    </>
  )
}