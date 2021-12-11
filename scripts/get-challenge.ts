import path from 'path';
import fs from 'fs';
import { log } from '../utils';
import { fetchInput } from './fetch-input';

export function getChallenge(day: number, year: number) {
  let yearStr = String(year);
  let dayStr = `${String(day).padStart(2, '0')}`;

  let templateDir = path.join('src', 'template');
  let dayDir = path.join('src', yearStr, dayStr);

  // Create directory if doesn't exist
  if (!fs.existsSync(dayDir)) {
    fs.mkdirSync(dayDir, { recursive: true });
    log.success(`Created directory ${dayDir}`);
  }

  // Copy template files to day directory
  if (fs.existsSync(templateDir)) {
    fs.cpSync(templateDir, dayDir, { recursive: true });
    log.success(`Copied template files to ${dayDir}`);
  } else {
    log.success(`No template found, adding empty files`);
    fs.writeFileSync(path.join(dayDir, '1.ts'), '');
    fs.writeFileSync(path.join(dayDir, '2.ts'), '');
    fs.writeFileSync(path.join(dayDir, 'index.txt'), '');
  }

  const inputPath = path.join(dayDir, 'input.txt');

  fetchInput(year, day, inputPath);
}
