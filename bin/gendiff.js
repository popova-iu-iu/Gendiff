#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';

const program = new Command();

program

  .version('0.0.1', '-V, --version', 'output the version number')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1>, <filepath2>')

  .description('Compares two configuration files and shows a difference.');

program.parse();
