'use client'

import type { Card } from '@/types'
import { useState } from 'react'
import { PromptCard } from './promptCard'
import { AnimatePresence } from 'motion/react'

interface PromptCardsProps {
  cards: Card[]
}

export function PromptCards({ cards }: PromptCardsProps) {
  const [cardStack, setCardStack] = useState(cards)
  const [topCardId, setTopCardId] = useState(cards[cards.length - 1].id)

  return (
    <div className="absolute inset-0 top-1/2 left-1/2 -translate-1/2">
      <AnimatePresence>
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
      </AnimatePresence>
    </div>
  )
}
