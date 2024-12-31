import { SetMetadata } from '@nestjs/common';

export const AllowedRoles = (...roles: Role[]) => SetMetadata('roles', roles);
