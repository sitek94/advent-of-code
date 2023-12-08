import { command, run, number, option } from 'cmd-ts'
import { getChallenge } from './get-challenge'

const cmd = command({
  name: 'generate',
  description: 'Generate a new challenge, defaults to today',
  args: {
    day: option({
      type: number,
      long: 'day',
      description: 'Day',
      defaultValue: () => new Date().getDate(),
    }),
    year: option({
      type: number,
      long: 'year',
      description: 'Year',
      defaultValue: () => new Date().getFullYear(),
    }),
  },
  handler: ({ day, year }) => {
    getChallenge(day, year)
  },
})

run(cmd, process.argv.slice(2))







