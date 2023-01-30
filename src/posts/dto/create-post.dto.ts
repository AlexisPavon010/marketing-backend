import { IsArray, IsOptional, IsString, MinLength } from "class-validator";

export class CreatePostDto {

  @IsString()
  // @MinLength(1)
  uid: string;

  @IsString()
  @MinLength(1)
  categories: string;

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
  displayName: string

  @IsString()
  @IsOptional()
  photoURL: string
}
