import { SetMetadata } from '@nestjs/common';

export const IsPublic = () => SetMetadata(process.env.IS_PUBLIC_KEY, true);
