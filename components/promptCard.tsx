import { motion, Variants } from 'motion/react'
import { useState } from 'react'

interface PromptCardProps {
  index: number
  prompt: string
  isTopCard: boolean
}

export function PromptCard({ index, prompt, isTopCard }: PromptCardProps) {
  const [angle] = useState(
    (index + 1) *
      Math.PI *
      10 *
      Math.abs(Math.sin(1.0 / (0.05 * Math.cos(index)))),
  )
  const [radius] = useState(() => (isTopCard ? 0 : 100 + 2 * index))

  const variants: Variants = {
    initial: {
      x: 0,
      y: 0,
      opacity: 0,
    },
    reveal: {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeInOut',
      },
    },
  }

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 h-96 w-72 -translate-1/2 rounded-lg bg-stone-50 p-4 text-red-400 drop-shadow-2xl"
      initial="initial"
      animate="reveal"
      variants={variants}
    >
      <p className="font-mono text-2xl">{prompt}</p>
    </motion.div>
  )
}
