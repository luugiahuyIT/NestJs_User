import { IsEnum, IsString } from 'class-validator';
import { Role } from '../role.enum';

export class UpdateUserDto {
  @IsString()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEnum(Role)
  roles: Role;
}
