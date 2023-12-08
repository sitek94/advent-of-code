import split from 'just-split'
import { run } from '~/runner'

function solve(input: string) {
  const seeds = input.split('\n')[0].split('seeds: ')[1].split(' ').map(Number)

  // not inclusive [start, end)
  const ranges = (split(seeds, 2) as [number, number][]).map(
    ([start, length]) => [start, start + length] as [number, number],
  )

  const createConvert = (
    destinationStart: number,
    sourceStart: number,
    rangeLength: number,
  ) => {
    const convert = (source: number): number | null => {
      if (source >= sourceStart && source < sourceStart + rangeLength) {
        return destinationStart + (source - sourceStart)
      }

      return null
    }

    return {
      start: sourceStart,
      end: sourceStart + rangeLength,
      fn: convert,
    }
  }

  type MapName =
    | 'seed-to-soil'
    | 'soil-to-fertilizer'
    | 'fertilizer-to-water'
    | 'water-to-light'
    | 'light-to-temperature'
    | 'temperature-to-humidity'
    | 'humidity-to-location'

  type Map = {
    name: MapName
    convert: (seed: number) => number
    sourceRanges: number[]
  }
  const mapsMap = {} as Record<MapName, Map>
  const maps = [] as Map[]

  input
    .split('\n\n')
    .slice(1)
    .map(line => {
      const [name, lines] = line.split(' map:\n')
      const values = lines
        .split('\n')
        .map(row => row.split(' ').map(Number) as [number, number, number])

      const converters = values.map(v => createConvert(...v))

      const sourceRanges = values.map(v => v[0])

      console.log(sourceRanges)

      const mapFn = (seed: number) => {
        for (const converter of converters) {
          const value = converter.fn(seed)
          if (value !== null) {
            return value
          }
        }

        return seed
      }

      const map = {
        name: name as MapName,
        convert: mapFn,
        sourceRanges,
      }

      mapsMap[name] = map
      maps.push(map)
    })

  let lowest = Infinity

  const findLocation = (seed: number) => {
    for (const map of maps) {
      seed = map.convert(seed)
    }

    return seed
  }

  console.log(`Total ranges: ${ranges.length}`)

  ranges.forEach(([start, end], i) => {
    console.log(`Range ${i + 1}/${ranges.length}`)

    for (let i = start; i < end; i++) {
      const location = findLocation(i)
      if (location < lowest) {
        lowest = location
      }
    }
  })

  // Brute forced it :(
  // I'll try to rework my wip solution during the weekend
  return lowest
}

run({
  solve,
  tests: [
    {
      input: ``,
      expected: 46,
    },
  ],
  onlyTests: false,
})
