import {run} from '~/run'
import {LinkedList} from '~/utils/linked-list'
import {range} from '~/utils/index'

type FileOrSpace = {isFile: boolean; id?: number; size: number}

function solve(input: string) {
  let fileId = 0
  const list = new LinkedList<FileOrSpace>()

  input
    .split('')
    .map(Number)
    .forEach((size, index) => {
      let isFile = index % 2 === 0
      if (isFile) {
        list.append({isFile: true, size, id: fileId++})
      } else {
        list.append({isFile: false, size})
      }
    })

  let file = list.tail

  while (file) {
    if (!file.value.isFile) {
      file = file.prev
      continue
    }
    let space = list.head

    while (space !== file) {
      if (space.value.isFile) {
        space = space.next
        continue
      }

      // perfect fit
      if (space.value.size === file.value.size) {
        list.swapValues(space, file)
        break
      }

      // space left
      if (space.value.size > file.value.size) {
        const spaceLeft = space.value.size - file.value.size
        list.insertAfter(space, {isFile: false, size: spaceLeft})
        space.value.size = file.value.size
        list.swapValues(space, file)
        break
      }

      space = space.next
    }

    file = file.prev
  }

  let i = 0
  let checksum = 0

  list.forEach(({isFile, size, id}) => {
    range(size).forEach(() => {
      if (isFile) {
        checksum += id * i
      }
      i++
    })
  })

  return checksum
}

run({
  solve,
  tests: [
    {
      input: 'test.txt',
      expected: 2858,
    },
    {
      input: 'input.txt',
      expected: 6323761685944,
    },
  ],
})
