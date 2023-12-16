import type {Action} from './input'

export function partOne(actions: Action[]) {
  let position = 0
  let depth = 0

  for (const {type, value} of actions) {
    if (type === 'down') {
      depth += value
    }
    if (type === 'up') {
      depth -= value
    }
    if (type === 'forward') {
      position += value
    }
  }

  return position * depth
}

export function partTwo(actions: Action[]) {
  let position = 0
  let depth = 0
  let aim = 0

  for (const {type, value} of actions) {
    if (type === 'down') {
      aim += value
    }
    if (type === 'up') {
      aim -= value
    }
    if (type === 'forward') {
      position += value
      depth += aim * value
    }
  }

  return position * depth
}
