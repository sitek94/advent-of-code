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

logger.warn('This is a warning')
logger.error('This is a warning')
logger.success('This is a warning')
