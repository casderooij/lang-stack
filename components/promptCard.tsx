import { motion, Variants } from 'motion/react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'

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
  const [reveal, setReveal] = useState(false)

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
        delay: index * 0.2,
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

    if (validateAnswer(input)) {
      onSuccess()
    } else {
      return null
    }
  }

  function validateAnswer(input: string): boolean {
    return input.trim() === answer
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
              className="w-full rounded border border-red-400 p-2 outline-red-400 focus:outline-2"
            />
          </form>
        )}
      </div>

      <div className="grid place-content-center">
        <motion.button
          type="button"
          className="flex justify-center rounded p-2 text-stone-600 outline-red-400 focus-visible:outline-2"
          onClick={() => setReveal(!reveal)}
          animate={{ opacity: isTopCard ? 1 : 0 }}
        >
          {reveal ? (
            <EyeOpenIcon width={30} height={30} />
          ) : (
            <EyeClosedIcon width={30} height={30} />
          )}
        </motion.button>

        <motion.div className="font-mono" animate={{ opacity: reveal ? 1 : 0 }}>
          {answer}
        </motion.div>
      </div>
    </motion.div>
  )
}
