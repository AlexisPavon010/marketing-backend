import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {

  @IsBoolean()
  published: boolean;
  @IsNumber()
  @IsOptional()
  adminScore: number;
  @IsNumber()
  @IsOptional()
  juryScore: number;
  @IsString()
  @IsOptional()
  status: string
}
