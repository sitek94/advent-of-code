import path from 'path'
import fs from 'fs'
import {green} from 'kleur'
import {fetchInput} from './fetch-input'

export function getChallenge(day: number, year: number) {
  let yearStr = String(year)
  let dayStr = `${String(day).padStart(2, '0')}`

  let templateDir = path.join('src', 'template')
  let dayDir = path.join('src', yearStr, dayStr)

  // Create directory if doesn't exist
  if (!fs.existsSync(dayDir)) {
    fs.mkdirSync(dayDir, {recursive: true})
    console.log(green(`Created directory ${dayDir}`))
  }

  // Copy template files to day directory
  if (fs.existsSync(templateDir)) {
    fs.cpSync(templateDir, dayDir, {recursive: true})
    console.log(green(`Copied template files to ${dayDir}`))
  } else {
    console.log(green(`No template found, adding empty files`))
    fs.writeFileSync(path.join(dayDir, '1.ts'), '')
    fs.writeFileSync(path.join(dayDir, '2.ts'), '')
    fs.writeFileSync(path.join(dayDir, 'index.txt'), '')
    fs.writeFileSync(path.join(dayDir, 'test.txt'), '')
  }

  const inputPath = path.join(dayDir, 'input.txt')

  fetchInput(year, day, inputPath)
}
