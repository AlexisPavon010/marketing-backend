import { IsNumber, IsString } from "class-validator";

export class ReviewPostDto {
  @IsString()
  name: string;

  @IsNumber()
  score: number;

  @IsString()
  userId: string
}