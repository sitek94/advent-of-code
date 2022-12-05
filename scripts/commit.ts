import { execSync } from 'child_process'

export function commit(message: string, files: string[]) {
  // Add all files matching file name
  const filesStr = files.map(f => `**/${f}`).join(' ')
  execSync(`git commit ${filesStr} -m "${message}"`)
}
