import { IsArray, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreatePostDto {

  @IsString()
  // @MinLength(1)
  uid: string;

  @IsString()
  @MinLength(1)
  @IsOptional()
  categories: string;

  @IsString()
  @MinLength(1)
  @IsOptional()
  core_target: string;

  @IsNumber()
  @IsOptional()
  duration: number

  @IsString()
  @MinLength(1)
  @IsOptional()
  result: string;

  @IsString()
  @MinLength(1)
  @IsOptional()
  title: string;

  @IsString()
  @MinLength(1)
  @IsOptional()
  brand: string;

  @IsOptional()
  published?: boolean;

  @IsString()
  @MinLength(1)
  @IsOptional()
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
