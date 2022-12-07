import { run } from '../../runner'

type File = {
  type: 'file'
  name: string
  size: number
}
type Node = {
  type: 'node'
  name: string
  parent: Node
  children: Array<Node | File>
  size: number
}

function solve(input: string) {
  const commands = input.split('\n')

  const T: Node = {
    type: 'node',
    name: '/',
    parent: undefined,
    children: [],
    size: 0,
  }

  let currentNode: Node = undefined

  let readFiles = false

  for (let cmd of commands) {
    if (cmd.startsWith('$ cd')) {
      readFiles = false

      let target = cmd.split('$ cd ')[1]
      if (target === '/') {
        currentNode = T
      } else if (target === '..') {
        currentNode = currentNode!.parent
      } else {
        currentNode = currentNode!.children.find(c => c.name === target) as Node
      }
    }

    if (cmd.startsWith('$ ls')) {
      readFiles = true
      continue
    }

    if (readFiles) {
      if (cmd.startsWith('dir')) {
        let name = cmd.split(' ')[1]
        currentNode!.children.push({
          type: 'node',
          name,
          parent: currentNode,
          children: [],
          size: 0,
        })
      } else {
        let [size, name] = cmd.split(' ')
        currentNode!.children.push({
          type: 'file',
          name,
          size: Number(size),
        })
      }
    }
  }

  const calcSize = (n: Node) => {
    let size = 0

    for (let c of n.children) {
      if (c.type === 'node') {
        size += calcSize(c)
      } else {
        size += c.size
      }
    }

    n.size = size

    return size
  }

  calcSize(T)

  let total = 0
  const MAX_SIZE = 100000

  const findCount = (n: Node) => {
    if (n.size <= MAX_SIZE) {
      total += n.size
    }
    for (let child of n.children) {
      if (child.type === 'node') {
        findCount(child)
      }
    }
  }

  findCount(T)

  return total
}

run({
  solve,
  tests: [
    {
      input: `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`,
      expected: 95437,
    },
  ],
  // onlyTests: true,
})
