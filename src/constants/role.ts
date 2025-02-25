import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  Admin = 'admin',
  Player = 'player',
}

registerEnumType(Role, {
  name: 'Role',
  description: 'User accesss roles',
});
