import prompts, { PromptObject } from 'prompts'

const args = process.argv.slice(2)
const today = new Date()

/**
 * If script was run with `--day` flag, prompt for day and year, otherwise use
 * today's date.
 */
export async function getDate() {
  let day = today.getDate()
  let year = today.getFullYear()

  if (args?.includes('--day')) {
    const questions: PromptObject[] = [
      {
        type: 'number',
        name: 'day',
        message: 'Day',
      },
      {
        type: 'number',
        name: 'year',
        message: 'Year',
      },
    ]

    const response = await prompts(questions)

    day = response.day
    year = response.year
  }

  return { day, year }
}
