import { IsBoolean, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";

export class QueryPost {
  @IsOptional()
  @IsPositive()
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsNumber()
  skip?: number;

  @IsOptional()
  @IsString()
  orderBy: string

  @IsOptional()
  @IsString()
  category?: string

  @IsOptional()
  @IsString()
  brand?: string

  @IsOptional()
  @IsBoolean()
  published?: boolean

  @IsOptional()
  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  juryScore: string;
}