import { IsEmail, IsEnum, IsOptional, IsString, MaxLength, MinLength, ValidateIf } from 'class-validator';
import { UserRole } from '../../users/schemas/user.schema';

export class RegisterDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(72)
  password!: string;

  @IsString()
  @MinLength(1)
  @MaxLength(120)
  name!: string;

  @IsEnum(UserRole)
  role!: UserRole;

  @ValidateIf((o: RegisterDto) => o.role === UserRole.JobPoster)
  @IsString()
  @MinLength(1)
  @MaxLength(160)
  @IsOptional()
  companyName?: string;
}
