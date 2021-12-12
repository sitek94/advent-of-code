import kleur from 'kleur';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { existsSync, statSync, writeFileSync } from 'fs';

dotenv.config();

export const fetchInput = async (year: number, day: number, path: string) => {
  const API_URL = process.env.AOC_API ?? 'https://adventofcode.com';

  if (existsSync(path) && statSync(path).size > 0) {
    console.log(
      kleur.yellow(`Input for AoC ${year} day ${day} already fetched!`),
    );

    return;
  }

  fetch(`${API_URL}/${year}/day/${day}/input`, {
    headers: {
      cookie: `session=${process.env.AOC_SESSION_KEY}`,
    },
  })
    .then(res => {
      if (res.status !== 200) {
        throw new Error(String(res.status));
      }

      return res.text();
    })
    .then(body => {
      writeFileSync(path, body.replace(/\n$/, ''));
      console.log(kleur.green(`Saved input for AoC ${year} day ${day}!`));
    })
    .catch(handleErrors);
};

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
    );
  } else if (e.message.startsWith('5')) {
    console.log(kleur.red('SERVER ERROR'));
  } else if (e.message === '404') {
    console.log(kleur.yellow('CHALLENGE NOT YET AVAILABLE'));
  } else {
    console.log(
      kleur.red(
        "UNEXPECTED ERROR\nPlease check your internet connection.\n\nIf you think it's a bug, create an issue on github.\nHere are some details to include:\n",
      ),
    );
  }
};
