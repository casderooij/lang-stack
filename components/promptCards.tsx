'use client'

import type { Card } from '@/types'
import { motion, stagger } from 'motion/react'
import { PromptCard } from './promptCard'
import { useState } from 'react'

interface PromptCardsProps {
  cards: Card[]
}

export function PromptCards({ cards }: PromptCardsProps) {
  const [cardStack, setCardStack] = useState(cards)
  const [topCardId, setTopCardId] = useState(cards[cards.length - 1].id)

  if (cardStack.length === 0) {
    return <div></div>
  }

  return (
    <motion.div
      animate="reveal"
      transition={{ delayChildren: stagger(0.2) }}
      className="absolute inset-0 top-1/2 left-1/2 -translate-1/2 border border-red-300"
    >
      {cardStack.map((card, index) => (
        <PromptCard
          key={card.id}
          index={index}
          prompt={card.prompt}
          answer={card.answer}
          isTopCard={topCardId === card.id}
          onSuccess={() => {
            if (cardStack.length > 1) {
              setTopCardId(cardStack[cardStack.length - 2].id)
            }
            setCardStack((cards) => cards.filter(({ id }) => id !== card.id))
          }}
        />
      ))}
    </motion.div>
  )
}
