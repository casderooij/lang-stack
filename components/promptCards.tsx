'use client'

import type { Card } from '@/types'
import { motion, stagger } from 'motion/react'
import { PromptCard } from './promptCard'

interface PromptCardsProps {
  cards: Card[]
}

export function PromptCards({ cards }: PromptCardsProps) {
  return (
    <motion.div
      animate="reveal"
      transition={{ delayChildren: stagger(0.1) }}
      className="absolute top-0 left-0 h-screen w-screen"
    >
      {cards.map((card, index) => (
        <PromptCard key={card.id} index={index} card={card} />
      ))}
    </motion.div>
  )
}
