class ListNode<T extends object> {
  value: T
  next: ListNode<T> | null = null
  prev: ListNode<T> | null = null

  constructor(value: T) {
    this.value = value
  }
}

export class LinkedList<T extends object> {
  head: ListNode<T> | null = null
  tail: ListNode<T> | null = null
  length = 0

  append(value: T) {
    const node = new ListNode(value)
    if (!this.head) {
      this.head = node
      this.tail = node
    } else {
      this.tail!.next = node
      node.prev = this.tail
      this.tail = node
    }
    this.length++
    return node
  }

  prepend(value: T) {
    const node = new ListNode(value)
    if (!this.head) {
      this.head = node
      this.tail = node
    } else {
      node.next = this.head
      this.head.prev = node
      this.head = node
    }
    this.length++
    return node
  }

  insertAfter(node: ListNode<T>, value: T) {
    const newNode = new ListNode(value)
    const nextNode = node.next
    node.next = newNode
    newNode.prev = node
    if (nextNode) {
      newNode.next = nextNode
      nextNode.prev = newNode
    } else {
      this.tail = newNode
    }
    this.length++
    return newNode
  }

  remove(node: ListNode<T>) {
    const {prev, next} = node
    if (prev) prev.next = next
    if (next) next.prev = prev
    if (this.head === node) this.head = next
    if (this.tail === node) this.tail = prev
    this.length--
  }

  swapValues(node1: ListNode<T>, node2: ListNode<T>) {
    const temp1 = structuredClone(node1.value)
    node1.value = structuredClone(node2.value)
    node2.value = temp1
  }

  forEach(callback: (value: T, index: number) => void) {
    let current = this.head
    let i = 0
    while (current) {
      callback(current.value, i)
      current = current.next
      i++
    }
  }
}
