import { ContextType } from '@nestjs/common';

export type HostType = ContextType & 'graphql';
export enum HostTypes {
  GRAPHQL = 'graphql',
}
