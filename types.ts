export interface Stack {
  id: string
  name: string
}

export interface Card {
  id: string
  stackId: string
  prompt: string
  answer: string
}
