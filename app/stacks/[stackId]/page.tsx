import { PromptCards } from '@/components/promptCards'
import { Card } from '@/types'
import { readFileSync } from 'fs'
import { join } from 'path'

function getCardsInStack(stackId: string) {
  const filePath = join(process.cwd(), 'data', 'cards.json')
  const data = readFileSync(filePath, 'utf-8')
  const allCards: Card[] = JSON.parse(data)
  return allCards.filter((c) => c.stackId === stackId)
}

export default async function Page({
  params,
}: {
  params: Promise<{ stackId: string }>
}) {
  const { stackId } = await params
  const cards = getCardsInStack(stackId)

  if (cards.length === 0) {
    return (
      <div className="relative top-0 left-0 h-screen w-screen overflow-hidden"></div>
    )
  }

  return (
    <div className="relative top-0 left-0 h-screen w-screen overflow-hidden">
      <PromptCards cards={cards} />
    </div>
  )
}
