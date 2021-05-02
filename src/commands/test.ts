import * as JestTypes from '@jest/types';
import * as JestCore from '@jest/core';

export const command = 'test';

export const describe = 'Run otto tests.';

export const builder = {};

const baseConfig = {
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json'
    }
  },
  displayName: 'otto',
  testMatch: [
    '**/__otto__/**/*.[tj]s'
  ],
  testPathIgnorePatterns: [
    'dist'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  }
};

export async function handler (argv: any): Promise<void> {
  await JestCore.runCLI({
    config: JSON.stringify(baseConfig)
  } as JestTypes.Config.Argv, [process.cwd()]);
}
