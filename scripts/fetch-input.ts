import kleur from 'kleur'
import {existsSync, statSync, writeFileSync} from 'fs'

const AOC_API_URL = 'https://adventofcode.com'
const AOC_SESSION_KEY = Bun.env.AOC_SESSION_KEY

if (!AOC_SESSION_KEY) {
  console.log(
    kleur.red(
      'MISSING SESSION KEY in .env file!\nPlease add it and try again.',
    ),
  )
  process.exit(1)
}

export const fetchInput = async (year: number, day: number, path: string) => {
  if (existsSync(path) && statSync(path).size > 0) {
    console.log(
      kleur.yellow(`Input for AoC ${year} day ${day} already fetched!`),
    )

    return
  }

  fetch(`${AOC_API_URL}/${year}/day/${day}/input`, {
    headers: {
      cookie: `session=${AOC_SESSION_KEY}`,
    },
  })
    .then(res => {
      if (res.status !== 200) {
        throw new Error(String(res.status))
      }

      return res.text()
    })
    .then(body => {
      writeFileSync(path, body.replace(/\n$/, ''))
      console.log(kleur.green(`Saved input for AoC ${year} day ${day}!`))
    })
    .catch(handleErrors)
}

const handleErrors = (e: Error) => {
  if (e.message === '400' || e.message === '500') {
    console.log(
      kleur.red(
        'INVALID SESSION KEY\n\n' +
          'Please make sure that the session key in the .env file is correct.\n' +
          "You can find your session key in the 'session' cookie at:\n" +
          'https://adventofcode.com\n\n' +
          kleur.bold('Restart the script after changing the .env file.\n'),
      ),
    )
  } else if (e.message.startsWith('5')) {
    console.log(kleur.red('SERVER ERROR'))
  } else if (e.message === '404') {
    console.log(kleur.yellow('CHALLENGE NOT YET AVAILABLE'))
  } else {
    console.log(
      kleur.red(
        "UNEXPECTED ERROR\nPlease check your internet connection.\n\nIf you think it's a bug, create an issue on github.\nHere are some details to include:\n",
      ),
    )
  }
}
