import { motion } from 'framer-motion'
import './Vision.css'

// ============================================
// ANIMATION CONFIGURATION
// ============================================
const ANIMATION_TIMING = {
  staggerDelay: 0.05,      // Faster letter stagger
  containerDelay: 0.3,
  springDamping: 12,
  springStiffness: 300,    // Increased from 200
  logoFloatDuration: 4,
  shimmerDuration: 2,      // Faster shimmer
  taglineDuration: 4,
}

const INITIAL_TRANSFORMS = {
  logoScale: 0.2,          // More dramatic (was 0.3)
  logoRotate: -360,        // Full rotation (was -180)
  letterY: 50,
  letterRotateX: -90,
  letterScale: 0.5,
}

const HOVER_EFFECTS = {
  letterScale: 1.3,        // More dramatic (was 1.2)
  logoScale: 1.1,
}

// ============================================
// COMPONENT
// ============================================
const Vision = () => {
  const visionText = "VISION".split("")
  
  // ========================================
  // ANIMATION VARIANTS
  // ========================================
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: ANIMATION_TIMING.staggerDelay,
        delayChildren: ANIMATION_TIMING.containerDelay
      }
    }
  }

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: INITIAL_TRANSFORMS.letterY,
      rotateX: INITIAL_TRANSFORMS.letterRotateX,
      scale: INITIAL_TRANSFORMS.letterScale
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: ANIMATION_TIMING.springDamping,
        stiffness: ANIMATION_TIMING.springStiffness
      }
    }
  }

  // ========================================
  // RENDER
  // ========================================
  return (
    <div className="vision-container">
      <motion.div
        className="vision-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {/* Logo with dramatic entrance */}
        <motion.div
          className="logo-container"
          initial={{ 
            opacity: 0, 
            scale: INITIAL_TRANSFORMS.logoScale, 
            rotate: INITIAL_TRANSFORMS.logoRotate 
          }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ 
            duration: 1.5, 
            ease: [0.34, 1.56, 0.64, 1],
            delay: 0.2
          }}
          whileHover={{ 
            scale: HOVER_EFFECTS.logoScale,
            rotate: [0, -5, 5, -5, 0],
            transition: { duration: 0.5 }
          }}
        >
          <motion.img
            src="/logo.png"
            alt="Vision Logo"
            className="logo"
            animate={{
              y: [0, -40, 0],  // More dramatic float (was -20)
            }}
            transition={{
              duration: ANIMATION_TIMING.logoFloatDuration,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <div className="logo-glow"></div>
        </motion.div>

        {/* Animated VISION text */}
        <motion.h1
          className="vision-text"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {visionText.map((letter, index) => (
            <motion.span
              key={index}
              className="letter"
              variants={letterVariants}
              whileHover={{
                scale: HOVER_EFFECTS.letterScale,
                color: "#fff",
                textShadow: "0 0 40px rgba(255,255,255,0.8)",
                transition: { duration: 0.2 }
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>

        {/* Tagline with breathing effect */}
        <motion.div
          className="tagline"
          initial={{ opacity: 0, filter: "blur(20px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 2, delay: 1.5 }}
        >
          <motion.p
            animate={{
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: ANIMATION_TIMING.taglineDuration,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Discord Tools Beyond Limits
          </motion.p>
        </motion.div>

        {/* Glitch overlay effect */}
        <motion.div
          className="glitch-overlay"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.1, 0, 0.15, 0],
            x: [0, -5, 5, -5, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatDelay: 3
          }}
        />
      </motion.div>
    </div>
  )
}

export default Vision
