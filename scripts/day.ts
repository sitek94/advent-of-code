import { getChallenge } from './get-challenge'

const prompts = require('prompts')

const questions = [
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

;(async () => {
  const response = await prompts(questions)
  const { day, year } = response

  getChallenge(day, year)
})()
