import { getDate } from './get-date'
import { initChallenge, saveFirstPart, saveSecondPart } from './challanges'
import { red } from 'kleur'

run()

async function run() {
  const args = process.argv.slice(2)
  const { year, day } = await getDate()

  if (!args.length) {
    console.log(red('No command provided, see "start.ts" for possible options'))
    return
  }

  switch (args[0]) {
    case '--init':
      return initChallenge(day, year)

    case '--partOne':
      return saveFirstPart({ year, day })

    case '--partTwo':
      return saveSecondPart({ year, day })
  }
}
