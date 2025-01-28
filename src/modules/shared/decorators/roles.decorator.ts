import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/constants/role';

export const Roles = (...roles: Role[]) => SetMetadata(process.env.ROLES_KEY, roles);
