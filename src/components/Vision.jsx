import { motion } from 'framer-motion'
import './Vision.css'

const Vision = () => {
  const visionText = "VISION".split("")
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -90,
      scale: 0.5
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200
      }
    }
  }

  return (
    <div className="vision-container">
      <motion.div
        className="vision-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <motion.div
          className="logo-container"
          initial={{ opacity: 0, scale: 0.3, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ 
            duration: 1.5, 
            ease: [0.34, 1.56, 0.64, 1], // Bounce easing
            delay: 0.2
          }}
          whileHover={{ 
            scale: 1.1,
            rotate: [0, -5, 5, -5, 0],
            transition: { duration: 0.5 }
          }}
        >
          <motion.img
            src="/logo.png"
            alt="Vision Logo"
            className="logo"
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <div className="logo-glow"></div>
        </motion.div>

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
                scale: 1.2,
                color: "#fff",
                textShadow: "0 0 40px rgba(255,255,255,1)",
                transition: { duration: 0.2 }
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>

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
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Discord Tools Beyond Limits
          </motion.p>
        </motion.div>

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
