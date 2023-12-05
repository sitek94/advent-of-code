import { log } from '../../../utils'
import { run } from '../../runner'

function solve(input: string) {
  const seeds = input.split('\n')[0].split('seeds: ')[1].split(' ').map(Number)

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

    return convert
  }

  type MapName =
    | 'seed-to-soil'
    | 'soil-to-fertilizer'
    | 'fertilizer-to-water'
    | 'water-to-light'
    | 'light-to-temperature'
    | 'temperature-to-humidity'
    | 'humidity-to-location'

  const mapsMap = {} as Record<MapName, (seed: number) => number>
  const maps = [] as { name: MapName; fn: (seed: number) => number }[]

  input
    .split('\n\n')
    .slice(1)
    .map(line => {
      const [name, lines] = line.split(' map:\n')
      const values = lines
        .split('\n')
        .map(row => row.split(' ').map(Number) as [number, number, number])

      const converters = values.map(v => createConvert(...v))

      const mapFn = (seed: number) => {
        for (const converter of converters) {
          const value = converter(seed)
          if (value !== null) {
            return value
          }
        }

        return seed
      }

      mapsMap[name] = mapFn
      maps.push({ name: name as MapName, fn: mapFn })
    })

  const findLocation = (seed: number) => {
    for (const map of maps) {
      seed = map.fn(seed)
    }

    return seed
  }

  let lowest = Infinity

  seeds.forEach(seed => {
    const location = findLocation(seed)
    if (location < lowest) {
      lowest = location
    }
  })

  return lowest
}

run({
  solve,
  tests: [
    {
      input: ``,
      expected: 35,
    },
  ],
  onlyTests: true,
})
