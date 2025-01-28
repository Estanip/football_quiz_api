import { registerEnumType } from '@nestjs/graphql';

export enum Level {
  EASY = 'Easy',
}

registerEnumType(Level, {
  name: 'Level',
  description: 'Difficulty levels for questions',
});
