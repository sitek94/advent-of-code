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

  const isSafeEnhanced = (report: number[]) => {
    if (isSafe(report)) return true

    for (let i = 0; i < report.length; i++) {
      let reportWithoutOne = report.filter((_, index) => index !== i)
      if (isSafe(reportWithoutOne)) return true
    }

    return false
  }

  const safeReports = reports.filter(r => isSafeEnhanced(r))

  return safeReports.length
}

run({
  solve,
  tests: [
    {
      input: 'test.txt',
      expected: 4,
    },
    {
      input: 'test2.txt',
      expected: 5,
    },
    {
      input: 'input.txt',
      expected: 100,
    },
  ],
})
