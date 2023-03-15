import { Trim } from 'class-sanitizer'
import { Expose } from 'class-transformer'
import {
  IsEmail,
  IsOptional,
  IsString,
} from 'class-validator'

export class UserDto {
  @Expose()
  @IsString()
  @Trim()
  userId: string

  @Expose()
  @IsString()
  @Trim()
  fullName: string

  @Expose()
  @Trim()
  @IsString()
  @IsOptional()
  accountNumber: string

  @Expose()
  @Trim()
  @IsEmail()
  @IsOptional()
  emailAddress?: string

  @Expose()
  @IsString()
  @Trim()
  @IsOptional()
  registrationNumber?: string
}


