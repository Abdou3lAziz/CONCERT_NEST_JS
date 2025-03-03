import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminDto } from './create-users-dto';

export class UpdateUsersDto extends PartialType(CreateAdminDto) {}
