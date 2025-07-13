import type { Card } from '@/types'
import { PromptCard } from './promptCard'

interface CardListProps {
  cards: Card[]
}

export function CardList({ cards }: CardListProps) {
  return (
    <div>
      {cards.map((card) => (
        <PromptCard key={card.id} card={card} />
      ))}
    </div>
  )
}
