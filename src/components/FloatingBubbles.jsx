import { useEffect, useRef } from 'react'
import './FloatingBubbles.css'

const FloatingBubbles = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let bubbles = []

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Bubble class
    class Bubble {
      constructor() {
        this.reset()
      }

      reset() {
        this.x = Math.random() * canvas.width
        this.y = canvas.height + 50
        this.size = Math.random() * 60 + 20 // 20-80px bubbles
        this.speedY = Math.random() * 2 + 1.5 // Rising speed
        this.speedX = (Math.random() - 0.5) * 0.8 // Horizontal drift
        this.opacity = Math.random() * 0.3 + 0.1 // 0.1-0.4 opacity
        this.wobble = Math.random() * Math.PI * 2
        this.wobbleSpeed = Math.random() * 0.02 + 0.01
        this.wobbleAmount = Math.random() * 2 + 1
      }

      update() {
        // Rising motion
        this.y -= this.speedY
        
        // Wobble/drift motion
        this.wobble += this.wobbleSpeed
        this.x += Math.sin(this.wobble) * this.wobbleAmount + this.speedX

        // Reset if bubble goes off screen
        if (this.y + this.size < 0) {
          this.reset()
        }

        // Wrap horizontally
        if (this.x > canvas.width + this.size) this.x = -this.size
        if (this.x < -this.size) this.x = canvas.width + this.size
      }

      draw() {
        // Outer glow
        const gradient = ctx.createRadialGradient(
          this.x - this.size * 0.2,
          this.y - this.size * 0.2,
          0,
          this.x,
          this.y,
          this.size
        )
        
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity * 0.8})`)
        gradient.addColorStop(0.3, `rgba(255, 255, 255, ${this.opacity * 0.4})`)
        gradient.addColorStop(0.7, `rgba(200, 200, 200, ${this.opacity * 0.2})`)
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`)

        // Draw bubble
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Highlight
        const highlightGradient = ctx.createRadialGradient(
          this.x - this.size * 0.3,
          this.y - this.size * 0.3,
          0,
          this.x - this.size * 0.3,
          this.y - this.size * 0.3,
          this.size * 0.5
        )
        
        highlightGradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity * 1.2})`)
        highlightGradient.addColorStop(0.5, `rgba(255, 255, 255, ${this.opacity * 0.3})`)
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

        // Rim/edge effect
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity * 0.5})`
        ctx.lineWidth = 1.5
        ctx.stroke()
      }
    }

    // Initialize bubbles
    const initBubbles = () => {
      bubbles = []
      const bubbleCount = Math.floor((canvas.width * canvas.height) / 8000) // Lots of bubbles
      for (let i = 0; i < bubbleCount; i++) {
        const bubble = new Bubble()
        // Spread initial positions
        bubble.y = Math.random() * canvas.height + canvas.height
        bubbles.push(bubble)
      }
    }
    initBubbles()

    // Animation loop
    const animate = () => {
      // Clear with slight trail for smooth effect
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw bubbles
      bubbles.forEach(bubble => {
        bubble.update()
        bubble.draw()
      })

      animationFrameId = requestAnimationFrame(animate)
    }
    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="bubbles-canvas" />
}

export default FloatingBubbles

