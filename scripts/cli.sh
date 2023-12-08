#!/bin/bash

# CLI for Advent of Code TypeScript Exercises
# This script allows you to run TypeScript solutions for the Advent of Code challenges 
# directly from the command line. It supports running exercises based on the specified 
# part, day, and year, defaulting to the current day and year if not provided.

# Usage:
# bun <part> [day] [year]
# - <part>: Mandatory. The part of the day's challenge to run (1 or 2).
# - [day]: Optional. The day of the challenge to run. Defaults to today's date if not provided.
# - [year]: Optional. The year of the challenge to run. Defaults to the current year if not provided.

# Examples:
# bun 1       - Runs the first part of today's challenge.
# bun 2       - Runs the second part of today's challenge.
# bun 1 12    - Runs the first part of the challenge on the 12th day of the current year.
# bun 2 15 2022 - Runs the second part of the challenge on the 15th day of 2022.

# File Path Format:
# src/<year>/<day>/<part>.ts
# e.g., src/2023/12/1.ts for the first part of the challenge on the 12th day of 2023.

# Checking input and printing usage
if [ -z "$1" ] || ([ "$1" -ne 1 ] && [ "$1" -ne 2 ]) || (! [[ $2 =~ ^[0-9]+$ ]] && [ -n "$2" ]) || (! [[ $3 =~ ^[0-9]+$ ]] && [ -n "$3" ]); then
  echo "Invalid usage. Please follow the format: bun <part> [day] [year]"
  echo "Refer to the script comments for more details on usage."
  exit 1
fi

# Get current day and year
get_current_date() {
  echo $(date +%Y) $(date +%d)
}

# Parse command line arguments
part=$1
day=${2:-$(get_current_date | cut -d' ' -f2)}
year=${3:-$(get_current_date | cut -d' ' -f1)}

# Remove leading zero if present (to avoid octal interpretation)
day=$(echo $day | sed 's/^0*//')

# Ensure day is two digits
day=$(printf "%02d" $day)

# Construct file path
file_path="src/$year/$day/$part.ts"

# Check if file exists and run it
if [ -f $file_path ]; then
  echo "Running $file_path..."
  bun $file_path
else
  echo "File $file_path does not exist."
fi
