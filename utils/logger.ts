import kleur from 'kleur'

export const logger = {
  log: console.log,
  dir: console.dir,
  warn: (message: string) => {
    console.warn(kleur.yellow(message))
  },
  error: (message: string) => {
    console.error(kleur.red(message))
  },
  success: (message: string) => {
    console.log(kleur.green(message))
  },

  bold: kleur.bold,
}
