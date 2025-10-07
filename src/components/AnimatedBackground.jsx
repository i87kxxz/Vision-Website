import { useEffect, useRef } from 'react'
import './AnimatedBackground.css'

// ============================================
// CONFIGURATION
// ============================================
const PARTICLE_CONFIG = {
  density: 8000,           // Lower = more particles
  sizeMin: 1,
  sizeMax: 5,
  speedRange: 1.5,         // Increased for more intense motion
  opacityMin: 0.15,        // Reduced brightness
  opacityMax: 0.4,
  angleSpeedMin: 0.02,     // Faster rotation
  angleSpeedMax: 0.03,
  waveRadiusMin: 50,       // More dramatic wave motion
  waveRadiusMax: 80,
  glowMultiplier: 2,       // Reduced from 3
}

const CONNECTION_CONFIG = {
  maxDistance: 150,
  baseOpacity: 0.15,       // Reduced from 0.3
  glowWidth: 2,
  coreWidth: 1,
}

const ANIMATION_CONFIG = {
  trailOpacity: 0.08,
}

// ============================================
// COMPONENT
// ============================================
const AnimatedBackground = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let particles = []

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
    // PARTICLE CLASS
    // ========================================
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * (PARTICLE_CONFIG.sizeMax - PARTICLE_CONFIG.sizeMin) + PARTICLE_CONFIG.sizeMin
        this.speedX = Math.random() * PARTICLE_CONFIG.speedRange - PARTICLE_CONFIG.speedRange / 2
        this.speedY = Math.random() * PARTICLE_CONFIG.speedRange - PARTICLE_CONFIG.speedRange / 2
        this.opacity = Math.random() * (PARTICLE_CONFIG.opacityMax - PARTICLE_CONFIG.opacityMin) + PARTICLE_CONFIG.opacityMin
        this.baseX = this.x
        this.baseY = this.y
        this.angle = Math.random() * Math.PI * 2
        this.angleSpeed = Math.random() * (PARTICLE_CONFIG.angleSpeedMax - PARTICLE_CONFIG.angleSpeedMin) + PARTICLE_CONFIG.angleSpeedMin
        this.waveRadius = Math.random() * (PARTICLE_CONFIG.waveRadiusMax - PARTICLE_CONFIG.waveRadiusMin) + PARTICLE_CONFIG.waveRadiusMin
      }

      update() {
        // Apply wave motion
        this.angle += this.angleSpeed
        this.x = this.baseX + Math.cos(this.angle) * this.waveRadius
        this.y = this.baseY + Math.sin(this.angle) * this.waveRadius
        
        // Apply drift
        this.baseX += this.speedX
        this.baseY += this.speedY

        // Wrap around screen edges
        if (this.baseX > canvas.width) this.baseX = 0
        if (this.baseX < 0) this.baseX = canvas.width
        if (this.baseY > canvas.height) this.baseY = 0
        if (this.baseY < 0) this.baseY = canvas.height
      }

      draw() {
        // Outer glow effect
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * PARTICLE_CONFIG.glowMultiplier
        )
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`)
        gradient.addColorStop(0.3, `rgba(255, 255, 255, ${this.opacity * 0.4})`)
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size * PARTICLE_CONFIG.glowMultiplier, 0, Math.PI * 2)
        ctx.fill()
        
        // Bright core
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.9})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // ========================================
    // PARTICLE INITIALIZATION
    // ========================================
    const initParticles = () => {
      particles = []
      const particleCount = Math.floor((canvas.width * canvas.height) / PARTICLE_CONFIG.density)
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }
    initParticles()

    // ========================================
    // CONNECTION DRAWING
    // ========================================
    const drawConnections = () => {
      particles.forEach((particleA, indexA) => {
        particles.slice(indexA + 1).forEach(particleB => {
          const dx = particleA.x - particleB.x
          const dy = particleA.y - particleB.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < CONNECTION_CONFIG.maxDistance) {
            const opacity = CONNECTION_CONFIG.baseOpacity * (1 - distance / CONNECTION_CONFIG.maxDistance)
            
            // Subtle glow line
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.4})`
            ctx.lineWidth = CONNECTION_CONFIG.glowWidth
            ctx.beginPath()
            ctx.moveTo(particleA.x, particleA.y)
            ctx.lineTo(particleB.x, particleB.y)
            ctx.stroke()
            
            // Core line
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
            ctx.lineWidth = CONNECTION_CONFIG.coreWidth
            ctx.beginPath()
            ctx.moveTo(particleA.x, particleA.y)
            ctx.lineTo(particleB.x, particleB.y)
            ctx.stroke()
          }
        })
      })
    }

    // ========================================
    // ANIMATION LOOP
    // ========================================
    const animate = () => {
      // Create smooth trail effect
      ctx.fillStyle = `rgba(0, 0, 0, ${ANIMATION_CONFIG.trailOpacity})`
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw all particles
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })

      // Draw connections between nearby particles
      drawConnections()

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

  return (
    <>
      <canvas ref={canvasRef} className="animated-canvas" />
      <div className="gradient-overlay" />
    </>
  )
}

export default AnimatedBackground

