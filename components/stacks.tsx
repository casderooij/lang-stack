import { Stack } from '@/types'
import { readFileSync } from 'fs'
import Link from 'next/link'
import { join } from 'path'

function getStacks() {
  const filePath = join(process.cwd(), 'data', 'stacks.json')
  const data = readFileSync(filePath, 'utf-8')
  return JSON.parse(data) as Stack[]
}

export function Stacks() {
  const stacks = getStacks()

  if (stacks.length === 0) {
    return 'No stacks found'
  }

  return (
    <div>
      <h2>Stacks</h2>
      <ul>
        {stacks.map((stack) => (
          <li key={stack.id}>
            <Link href={`/stacks/${stack.id}`}>{stack.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
