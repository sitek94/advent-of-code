import path from 'path'
import fs from 'fs'
import { green } from 'kleur'

import { fetchInput } from './fetch-input'
import { Part, save } from './save'
import { commit } from './commit'
import { Filename } from './consts'

export async function initChallenge(day: number, year: number) {
  let yearStr = String(year)
  let dayStr = `${String(day).padStart(2, '0')}`

  let templateDir = path.join('src', 'template')
  let dayDir = path.join('src', yearStr, dayStr)

  // Create directory if doesn't exist
  if (!fs.existsSync(dayDir)) {
    fs.mkdirSync(dayDir, { recursive: true })
    console.log(green(`Created directory ${dayDir}`))
  }

  // Copy template files to day directory
  if (fs.existsSync(templateDir)) {
    fs.cpSync(templateDir, dayDir, { recursive: true })
    console.log(green(`Copied template files to ${dayDir}`))
  } else {
    console.log(green(`No template found, adding empty files`))
    fs.writeFileSync(path.join(dayDir, Filename.PartOne), '')
    fs.writeFileSync(path.join(dayDir, Filename.PartTwo), '')
    fs.writeFileSync(path.join(dayDir, Filename.Input), '')
  }

  const inputPath = path.join(dayDir, Filename.Input)

  await fetchInput(year, day, inputPath)

  save({ year, day, part: Part.One, start: new Date() })
  commit(`get challenge ${year} day ${day}`, [
    Filename.Timestamps,
    Filename.PartOne,
    Filename.PartTwo,
    Filename.Input,
  ])
}

export function saveFirstPart({ year, day }: { year: number; day: number }) {
  save({ year, day, part: Part.One, start: new Date() })
  commit(`complete 1st part of ${year} day ${day}`, [
    Filename.Timestamps,
    Filename.PartOne,
  ])
}

export function saveSecondPart({ year, day }: { year: number; day: number }) {
  save({ year, day, part: Part.Two, start: new Date() })
  commit(`complete 2nd part of ${year} day ${day}`, [
    Filename.Timestamps,
    Filename.PartTwo,
  ])
}
