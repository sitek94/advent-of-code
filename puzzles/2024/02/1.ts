import {run} from '~/run'

function solve(input: string) {
  const reports = input.split('\n').map(line => line.split(' ').map(Number))

  const isSafe = (report: number[]) => {
    let increasing = report[0] < report[1]

    for (let i = 0; i < report.length - 1; i++) {
      const current = report[i]
      const next = report[i + 1]
      const difference = Math.abs(current - next)

      if (increasing && current > next) return false
      if (!increasing && current < next) return false
      if (difference > 3) return false
      if (current === next) return false
    }
    return true
  }

  const safeReports = reports.filter(isSafe)

  return safeReports.length
}

run({
  solve,
  tests: [
    {
      input: 'test.txt',
      expected: 2,
    },
    {
      input: 'input.txt',
      expected: 100,
    },
  ],
})
