import {describe, expect, it} from 'bun:test'
import {PriorityQueue} from './priority-queue'

describe(`${PriorityQueue.name}`, () => {
  it('enqueues items in correct order with default `compare` function', () => {
    const pq = new PriorityQueue()

    pq.enqueue(1)
    pq.enqueue(5)
    pq.enqueue(3)
    pq.enqueue(7)

    expect(pq.copy()).toEqual([1, 3, 5, 7])
  })

  it('enqueues items using custom compare function', () => {
    type Item = {
      priority: number
    }
    const pq = new PriorityQueue((a: Item, b: Item) => a.priority < b.priority)

    pq.enqueue({priority: 1})
    pq.enqueue({priority: 5})
    pq.enqueue({priority: 3})
    pq.enqueue({priority: 7})

    expect(pq.copy()).toEqual([
      {priority: 1},
      {priority: 3},
      {priority: 5},
      {priority: 7},
    ])
  })
})
