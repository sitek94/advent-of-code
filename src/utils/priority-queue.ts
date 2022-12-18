export class PriorityQueue<T> {
  private collection: T[] = []

  constructor(private compare: (a: T, b: T) => boolean = (a, b) => a < b) {}

  enqueue(item: T) {
    let added = false
    for (let i = 0; i < this.size(); i++) {
      if (this.compare(item, this.collection[i])) {
        added = true
        this.collection.splice(i, 0, item)
        return item
      }
    }

    if (!added) {
      return this.collection.push(item)
    }
  }

  has(item: T) {
    return this.collection.includes(item)
  }

  dequeue() {
    return this.collection.shift()
  }

  size() {
    return this.collection.length
  }

  isEmpty() {
    return this.collection.length === 0
  }

  copy() {
    return this.collection.slice()
  }
}
