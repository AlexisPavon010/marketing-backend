import { IsArray, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreatePostDto {

  @IsString()
  // @MinLength(1)
  uid: string;

  @IsString()
  @MinLength(1)
  categories: string;

  @IsString()
  @MinLength(1)
  core_target: string;

  @IsNumber()
  duration: number

  @IsString()
  @MinLength(1)
  result: string;

  @IsString()
  @MinLength(1)
  title: string;

  @IsString()
  @MinLength(1)
  brand: string;

  @IsOptional()
  published?: boolean;

  @IsString()
  @MinLength(1)
  description: string;

  @IsArray()
  @IsOptional()
  images: string[]

  @IsArray()
  @IsOptional()
  videos: string[]

  @IsString()
  email: string

  @IsString()
  @IsOptional()
  username: string

  @IsString()
  @IsOptional()
  photoURL: string
}
