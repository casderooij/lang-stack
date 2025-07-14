'use client'

import type { Card } from '@/types'
import { shuffleArray } from '@/utils'
import { AnimatePresence } from 'motion/react'
import { useState } from 'react'
import { PromptCard } from './promptCard'

interface PromptCardsProps {
  cards: Card[]
}

export default function PromptCards({ cards }: PromptCardsProps) {
  const [cardStack, setCardStack] = useState(() => {
    if (typeof window === 'undefined') {
      return []
    }

    const min = 5
    const max = 5

    const count = Math.floor(Math.random() * (max - min + 1)) + min

    const shuffled = shuffleArray(cards)

    return shuffled.slice(0, count)
  })

  const topCard = cardStack[cardStack.length - 1] ?? null

  return (
    <div className="absolute inset-0 top-1/2 left-1/2 -translate-1/2">
      <AnimatePresence>
        {cardStack.map((card, index) => (
          <PromptCard
            key={card.id}
            index={index}
            prompt={card.prompt}
            answer={card.answer}
            isTopCard={topCard?.id === card.id}
            onSuccess={() => {
              setCardStack((stack) => stack.filter((c) => c.id !== card.id))
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
