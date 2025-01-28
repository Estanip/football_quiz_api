import { registerEnumType } from '@nestjs/graphql';

export enum Level {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard',
}

registerEnumType(Level, {
  name: 'Level',
  description: 'Difficulty levels for questions',
});
