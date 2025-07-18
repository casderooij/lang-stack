import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import { motion, Variants } from 'motion/react'
import { useState } from 'react'

const variants: Variants = {
  hide: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
}

interface PromptCardRevealProps {
  answer: string
}

export function PromptCardReveal({ answer }: PromptCardRevealProps) {
  const [reveal, setReveal] = useState(false)

  return (
    <div className="inline-flex flex-col justify-center gap-2">
      <motion.button
        type="button"
        className="flex justify-center rounded text-stone-600 outline-red-400 focus-visible:outline-2"
        onClick={() => setReveal(!reveal)}
        variants={variants}
      >
        {reveal ? (
          <EyeOpenIcon width={30} height={30} />
        ) : (
          <EyeClosedIcon width={30} height={30} />
        )}
      </motion.button>

      <motion.div
        className="text-center font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: reveal ? 1 : 0 }}
      >
        {answer}
      </motion.div>
    </div>
  )
}
