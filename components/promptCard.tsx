import type { Card } from '@/types'
import { motion, stagger, Variant, Variants } from 'motion/react'

interface PromptCardProps {
  index: number
  card: Card
}

export function PromptCard({ index, card }: PromptCardProps) {
  const cardVariants: Variants = {
    reveal: {
      scale: [0.9, 1],
      opacity: [0, 1],
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  }

  return (
    <motion.div
      variants={cardVariants}
      className="border-2 border-red-400 bg-white p-6"
    >
      {card.prompt}
    </motion.div>
  )
}
