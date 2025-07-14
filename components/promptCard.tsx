import { validateAnswer } from '@/utils'
import { motion, Variants } from 'motion/react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { PromptCardReveal } from './promptCardReveal'

interface PromptCardProps {
  index: number
  prompt: string
  answer: string
  isTopCard: boolean
  onSuccess: () => void
}

export function PromptCard({
  index,
  prompt,
  answer,
  isTopCard,
  onSuccess,
}: PromptCardProps) {
  const [angle] = useState(
    (index + 1) *
      Math.PI *
      10 *
      Math.abs(Math.sin(1.0 / (0.05 * Math.cos(index)))),
  )
  const [radius] = useState(() => (isTopCard ? 0 : 100 + 2 * index))
  const [rotation] = useState(Math.sin((index + 1) * 4) * (angle * 0.1))
  const [input, setInput] = useState('')

  const variants: Variants = {
    initial: {
      x: 0,
      y: 0,
      opacity: 0,
      rotate: isTopCard ? 0 : rotation,
    },
    reveal: {
      x: isTopCard ? 0 : Math.cos(angle) * radius,
      y: isTopCard ? 0 : Math.sin(angle) * radius,
      opacity: 1,
      rotate: isTopCard ? 0 : rotation,
      transition: {
        duration: 0.6,
        ease: 'easeInOut',
      },
    },
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setInput(event.target.value)
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if (validateAnswer(input, answer)) {
      onSuccess()
    } else {
      return null
    }
  }

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 flex h-96 w-72 -translate-1/2 flex-col rounded-2xl bg-stone-50 p-4 text-red-400 drop-shadow-2xl"
      initial="initial"
      animate="reveal"
      exit="initial"
      variants={variants}
    >
      <div className="flex flex-1 flex-col gap-2">
        <p className="font-mono text-2xl">{prompt}</p>

        {isTopCard && (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="answer"
              autoFocus
              autoComplete="off"
              onChange={handleChange}
              className="w-full rounded border border-red-400 p-2 font-mono outline-red-400 focus:outline-2"
            />
          </form>
        )}
      </div>

      {isTopCard && <PromptCardReveal answer={answer} />}
    </motion.div>
  )
}
