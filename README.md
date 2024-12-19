# Advent of Code

My [Advent of Code](https://adventofcode.com) solutions 🎄

## Scripts

Generate challenge files:

```shell
bun g [day] [year]

# Generate today's challenge files
bun g

# Generate day 12 of this year's challenge files
bun g 12

# Generate day 8 of 2019's challenge files
bun g 8 2019
```

Run challenge:

```shell
bun <part> [day] [year]

# Run part 1 or 2 of today's challenge
bun 1
bun 2

# Run part 1 of day 12 of this year
bun 1 12

# Run part 2 of day 8 of 2019
bun 2 8 2019
```

Use flags:

```shell
# No flags (default) - uses only test input
bun 1

# f — final - uses only final input
bun 1f

# a — all - uses both test and final input
bun 1a
```

Run tests for some utility functions:

```shell
bun test
```

## Even shorter scripts?

Set alias for Bun in your shell config file (e.g. `.bashrc` or `.zshrc`):

```shell
alias b="bun"
```

## Notes

- 2023: 9 — Least Common Multiple (LCM) + Greatest Common Divisor (GCD)
- 2023: 10 — Flood Fill + BFS
- 2023: 11 — Manhattan Distance
- 2024: 16 — Dijkstra's
- 2024: 18 — A\* Search
