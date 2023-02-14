import { IsString } from "class-validator";

export class SendEmailDto {
  @IsString()
  email: string
}