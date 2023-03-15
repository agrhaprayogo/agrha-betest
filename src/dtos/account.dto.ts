import { Trim } from "class-sanitizer";
import { Expose } from "class-transformer";
import { IsDateString, IsOptional, IsString } from "class-validator";

export class AccountDto {
  @Expose()
  @IsString()
  @Trim()
  userId: string;

  @Expose()
  @IsString()
  @Trim()
  userName: string;

  @Expose()
  @Trim()
  @IsString()
  password: string;

  @Expose()
  @Trim()
  @IsDateString()
  @IsOptional()
  lastLoginDate?: string;
}
