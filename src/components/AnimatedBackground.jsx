import { useEffect, useRef } from 'react'
import './AnimatedBackground.css'

const AnimatedBackground = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let particles = []

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 4 + 1 // Larger particles (1-5px)
        this.speedX = Math.random() * 0.8 - 0.4
        this.speedY = Math.random() * 0.8 - 0.4
        this.opacity = Math.random() * 0.7 + 0.3 // Brighter particles
        this.baseX = this.x
        this.baseY = this.y
        this.angle = Math.random() * Math.PI * 2
        this.angleSpeed = Math.random() * 0.01 + 0.005
        this.waveRadius = Math.random() * 30 + 10
      }

      update() {
        // Wave motion
        this.angle += this.angleSpeed
        this.x = this.baseX + Math.cos(this.angle) * this.waveRadius
        this.y = this.baseY + Math.sin(this.angle) * this.waveRadius
        
        // Drift
        this.baseX += this.speedX
        this.baseY += this.speedY

        // Wrap around screen
        if (this.baseX > canvas.width) this.baseX = 0
        if (this.baseX < 0) this.baseX = canvas.width
        if (this.baseY > canvas.height) this.baseY = 0
        if (this.baseY < 0) this.baseY = canvas.height
      }

      draw() {
        // Glow effect
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 3
        )
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`)
        gradient.addColorStop(0.3, `rgba(255, 255, 255, ${this.opacity * 0.5})`)
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2)
        ctx.fill()
        
        // Core
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 1.2})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Initialize particles
    const initParticles = () => {
      particles = []
      const particleCount = Math.floor((canvas.width * canvas.height) / 8000) // More particles
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }
    initParticles()

    // Animation loop
    const animate = () => {
      // Create trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })

      // Draw connections between nearby particles with glow
      particles.forEach((particleA, indexA) => {
        particles.slice(indexA + 1).forEach(particleB => {
          const dx = particleA.x - particleB.x
          const dy = particleA.y - particleB.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            const opacity = 0.3 * (1 - distance / 150)
            
            // Glow line
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.5})`
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.moveTo(particleA.x, particleA.y)
            ctx.lineTo(particleB.x, particleB.y)
            ctx.stroke()
            
            // Core line
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particleA.x, particleA.y)
            ctx.lineTo(particleB.x, particleB.y)
            ctx.stroke()
          }
        })
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

  return (
    <>
      <canvas ref={canvasRef} className="animated-canvas" />
      <div className="gradient-overlay" />
    </>
  )
}

export default AnimatedBackground

