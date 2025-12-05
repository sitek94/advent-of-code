export function mergeRanges(ranges: [number, number][]) {
  if (!ranges.length) return []

  const sorted = ranges.toSorted((a, b) => a[0] - b[0])

  const merged = [sorted[0]]

  for (let i = 1; i < sorted.length; i++) {
    const last = merged.at(-1)
    const current = sorted[i]

    // E.g. [1, 3] and [2, 4] should be merged into [1, 4]
    if (current[0] <= last[1]) {
      last[1] = Math.max(last[1], current[1])

      // No need to merge, just continue, e.g. [1, 3] and [4, 5]
    } else {
      merged.push(current)
    }
  }

  return merged
}
