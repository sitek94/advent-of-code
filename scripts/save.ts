import fs from 'node:fs'
import path from 'path'

import { Filename } from './consts'

interface Timestamps {
  [year: string]: {
    [day: string]: {
      [key in Part]: {
        start: string
        end: string
      }
    }
  }
}

export enum Part {
  One = 'partOne',
  Two = 'partTwo',
}

const TIMESTAMPS_PATH = path.join('scripts', Filename.Timestamps)

export function save({
  year,
  day,
  part,
  start,
  end,
}: {
  year: number
  day: number
  part: Part
  start?: Date
  end?: Date
}) {
  const timestamps: Timestamps = JSON.parse(
    fs.readFileSync(TIMESTAMPS_PATH, 'utf-8'),
  )

  if (!timestamps[year]) {
    timestamps[year] = {}
  }

  if (!timestamps[year]?.[day]) {
    timestamps[year][day] = initDay()
  }

  if (start) {
    timestamps[year][day][part].start = serializeDate(start)
  }
  if (end) {
    timestamps[year][day][part].end = serializeDate(end)
  }

  fs.writeFileSync(TIMESTAMPS_PATH, JSON.stringify(timestamps, null, 2))
}

function serializeDate(date: Date) {
  return date.toISOString()
}

function initDay() {
  return {
    [Part.One]: {
      start: '',
      end: '',
    },
    [Part.Two]: {
      start: '',
      end: '',
    },
  }
}
