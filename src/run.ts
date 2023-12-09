import kleur from 'kleur'
import {toFixed} from '~/utils'

const args = Bun.argv.slice(2)

const isTest = args.includes('--test')
const isFinal = args.includes('--final')

type SolveFn = (input: string) => string | number | void
type Test = {
  input: string
  expected: string | number
}

export const run = async ({
  solve,
  tests = [],
}: {
  solve: SolveFn
  tests?: Test[]
}) => {
  if (isTest) {
    tests = tests.filter(test => test.input === 'test.txt')
  }
  if (isFinal) {
    tests = tests.filter(test => test.input === 'input.txt')
  }

  await runTests({tests, solve})
}

const runTests = async ({tests, solve}: {tests: Test[]; solve: SolveFn}) => {
  tests.forEach(async (test, i) => {
    const isInputFile = test.input.endsWith('.txt')
    const input = isInputFile ? await readInputFile(test.input) : test.input

    const {result, time} = getRunningTime(() => solve(input))

    const testName = `Test ${i + 1}`

    if (result === test.expected) {
      console.log(kleur.green(`${testName} - passed ${time}`))
    } else {
      console.log(kleur.red(`${testName} - failed ${time}`))
      console.log(`\nResult:`)
      console.dir(result)
      console.log(`\nExpected:`)
      console.dir(test.expected)
      console.log()
    }
  })
}

const getRunningTime = (fn: () => any) => {
  const t0 = process.hrtime.bigint()
  const result = fn()
  const t1 = process.hrtime.bigint()
  const time = Number(t1 - t0) / 1e6

  return {time: `(${toFixed(time)}ms)`, result}
}

const readInputFile = async (filename: string) => {
  const pathToExercise = Bun.argv[1].split('/').slice(0, -1).join('/')
  const file = Bun.file(`${pathToExercise}/${filename}`)
  return file.text()
}
