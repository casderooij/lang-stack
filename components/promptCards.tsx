'use client'

import type { Card } from '@/types'
import { motion, stagger } from 'motion/react'
import { PromptCard } from './promptCard'
import { useState } from 'react'

interface PromptCardsProps {
  cards: Card[]
}

export function PromptCards({ cards }: PromptCardsProps) {
  const [topCardId, setTopCardId] = useState(cards[cards.length - 1].id)

  return (
    <motion.div
      animate="reveal"
      transition={{ delayChildren: stagger(0.2) }}
      className="absolute inset-0 top-1/2 left-1/2 -translate-1/2 border border-red-300"
    >
      {cards.map((card, index) => (
        <PromptCard
          key={card.id}
          index={index}
          prompt={card.prompt}
          isTopCard={topCardId === card.id}
          onClick={() => setTopCardId(card.id)}
        />
      ))}
    </motion.div>
  )
}
