import type { Card } from '@/types'

interface PromptCardProps {
  card: Card
}

export function PromptCard({ card }: PromptCardProps) {
  return (
    <div className="border-2 border-red-400 bg-white p-6">{card.prompt}</div>
  )
}
