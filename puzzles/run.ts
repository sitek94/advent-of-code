import {logger} from '~/utils/logger'
import {toFixed} from '~/utils/index'

const args = Bun.argv.slice(2)

const isTest = args.includes('--test')
const isFinal = args.includes('--final')

type SolveFn<TAnswer, TOptions> = (input: string, options: TOptions) => TAnswer

type Test<TAnswer, TOptions> = {
  input: string
  expected: TAnswer
} & TOptions

export const run = async <TAnswer, TOptions>({
  solve,
  tests = [],
}: {
  solve: SolveFn<TAnswer, TOptions>
  tests: Test<TAnswer, TOptions>[]
}) => {
  if (isTest) {
    tests = tests.filter(test => test.input.includes('test'))
  }
  if (isFinal) {
    tests = tests.filter(test => test.input === 'input.txt')
  }
  if (!tests.length) {
    logger.error('No tests found')
    process.exit(1)
  }

  await runTests({tests, solve})
}

const runTests = async <TAnswer, TOptions>({
  tests,
  solve,
}: {
  solve: SolveFn<TAnswer, TOptions>
  tests: Test<TAnswer, TOptions>[]
}) => {
  for (let i = 0; i < tests.length; i++) {
    const test = tests[i]
    const isInputFile = test.input.endsWith('.txt')
    const input = isInputFile ? await readInputFile(test.input) : test.input

    const {result, time} = getRunningTime(() => solve(input, test))

    const testName = `Test ${i + 1}`

    if (result === test.expected) {
      logger.success(`${testName} - passed ${time}`)
    } else {
      logger.error(`${testName} - failed ${time}`)
      logger.log(`\nResult:`)
      logger.dir(result)
      logger.log(`\nExpected:`)
      logger.dir(test.expected)
      logger.log()
    }
  }
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
  if (!file.exists()) {
    logger.error(`Input file not found: ${filename}`)
    process.exit(1)
  }

  const text = await file.text()
  if (!text) {
    logger.error(`Input file empty: ${filename}`)
    process.exit(1)
  }

  return text
}
