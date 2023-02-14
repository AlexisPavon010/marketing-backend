import { IsString } from "class-validator";

export class RecoveryPassword {
  @IsString()
  email: string
}