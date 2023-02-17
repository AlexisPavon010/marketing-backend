import { IsEmail } from "class-validator";

export class PostulationDto {
  @IsEmail()
  email: string
}