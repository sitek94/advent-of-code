import { getChallenge } from './get-challenge'

let today = new Date()
let day = today.getDate()
let year = today.getFullYear()

getChallenge(day, year)
