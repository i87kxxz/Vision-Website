import { useEffect, useRef } from 'react'
import './FloatingBubbles.css'

// ============================================
// CONFIGURATION
// ============================================
const BUBBLE_CONFIG = {
  density: 8000,           // Lower = more bubbles
  sizeMin: 30,             // Increased from 20
  sizeMax: 100,            // Increased from 80
  speedMin: 2.5,           // Increased from 1.5
  speedMax: 5,             // Increased from 3.5
  driftRange: 0.8,
  opacityMin: 0.05,        // Reduced from 0.1
  opacityMax: 0.2,         // Reduced from 0.4
  wobbleSpeedMin: 0.03,    // Increased from 0.01
  wobbleSpeedMax: 0.05,    // Increased from 0.03
  wobbleAmountMin: 4,      // Increased from 1
  wobbleAmountMax: 6,      // Increased from 3
}

// ============================================
// COMPONENT
// ============================================
const FloatingBubbles = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let bubbles = []

    // ========================================
    // CANVAS SETUP
    // ========================================
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // ========================================
    // BUBBLE CLASS
    // ========================================
    class Bubble {
      constructor() {
        this.reset()
      }

      reset() {
        this.x = Math.random() * canvas.width
        this.y = canvas.height + 50
        this.size = Math.random() * (BUBBLE_CONFIG.sizeMax - BUBBLE_CONFIG.sizeMin) + BUBBLE_CONFIG.sizeMin
        this.speedY = Math.random() * (BUBBLE_CONFIG.speedMax - BUBBLE_CONFIG.speedMin) + BUBBLE_CONFIG.speedMin
        this.speedX = (Math.random() - 0.5) * BUBBLE_CONFIG.driftRange
        this.opacity = Math.random() * (BUBBLE_CONFIG.opacityMax - BUBBLE_CONFIG.opacityMin) + BUBBLE_CONFIG.opacityMin
        this.wobble = Math.random() * Math.PI * 2
        this.wobbleSpeed = Math.random() * (BUBBLE_CONFIG.wobbleSpeedMax - BUBBLE_CONFIG.wobbleSpeedMin) + BUBBLE_CONFIG.wobbleSpeedMin
        this.wobbleAmount = Math.random() * (BUBBLE_CONFIG.wobbleAmountMax - BUBBLE_CONFIG.wobbleAmountMin) + BUBBLE_CONFIG.wobbleAmountMin
      }

      update() {
        // Rising motion (upward)
        this.y -= this.speedY
        
        // Wobble and drift motion
        this.wobble += this.wobbleSpeed
        this.x += Math.sin(this.wobble) * this.wobbleAmount + this.speedX

        // Reset if bubble goes off top of screen
        if (this.y + this.size < 0) {
          this.reset()
        }

        // Wrap horizontally at screen edges
        if (this.x > canvas.width + this.size) this.x = -this.size
        if (this.x < -this.size) this.x = canvas.width + this.size
      }

      draw() {
        // Main bubble gradient (reduced brightness)
        const gradient = ctx.createRadialGradient(
          this.x - this.size * 0.2,
          this.y - this.size * 0.2,
          0,
          this.x,
          this.y,
          this.size
        )
        
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity * 0.6})`)
        gradient.addColorStop(0.3, `rgba(255, 255, 255, ${this.opacity * 0.3})`)
        gradient.addColorStop(0.7, `rgba(200, 200, 200, ${this.opacity * 0.15})`)
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`)

        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Subtle highlight (reduced intensity)
        const highlightGradient = ctx.createRadialGradient(
          this.x - this.size * 0.3,
          this.y - this.size * 0.3,
          0,
          this.x - this.size * 0.3,
          this.y - this.size * 0.3,
          this.size * 0.5
        )
        
        highlightGradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity * 0.8})`)
        highlightGradient.addColorStop(0.5, `rgba(255, 255, 255, ${this.opacity * 0.2})`)
        highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

        ctx.beginPath()
        ctx.arc(
          this.x - this.size * 0.3,
          this.y - this.size * 0.3,
          this.size * 0.4,
          0,
          Math.PI * 2
        )
        ctx.fillStyle = highlightGradient
        ctx.fill()

        // Subtle rim effect
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity * 0.3})`
        ctx.lineWidth = 1.5
        ctx.stroke()
      }
    }

    // ========================================
    // BUBBLE INITIALIZATION
    // ========================================
    const initBubbles = () => {
      bubbles = []
      const bubbleCount = Math.floor((canvas.width * canvas.height) / BUBBLE_CONFIG.density)
      for (let i = 0; i < bubbleCount; i++) {
        const bubble = new Bubble()
        // Spread initial positions vertically for smooth entry
        bubble.y = Math.random() * canvas.height + canvas.height
        bubbles.push(bubble)
      }
    }
    initBubbles()

    // ========================================
    // ANIMATION LOOP
    // ========================================
    const animate = () => {
      // Clear canvas for fresh frame
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw all bubbles
      bubbles.forEach(bubble => {
        bubble.update()
        bubble.draw()
      })

      animationFrameId = requestAnimationFrame(animate)
    }
    animate()

    // ========================================
    // CLEANUP
    // ========================================
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="bubbles-canvas" />
}

export default FloatingBubbles

