import { Trim } from "class-sanitizer";
import { Expose } from "class-transformer";
import { IsEmail, IsString } from "class-validator";

export class RegisterDto {
  @Expose()
  @IsString()
  @Trim()
  fullName: string;

  @Expose()
  @Trim()
  accountNumber: string;

  @Expose()
  @Trim()
  @IsEmail()
  emailAddress: string;

  @Expose()
  @IsString()
  @Trim()
  registrationNumber: string;

  @Expose()
  @Trim()
  userName: string;

  @Expose()
  @Trim()
  password: string;
}


