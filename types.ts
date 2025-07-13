export interface Stack {
  id: string
  name: string
  translation: {
    from: string
    to: string
  }
}

export interface Card {
  id: string
  stackId: string
  prompt: string
  answer: string
}
