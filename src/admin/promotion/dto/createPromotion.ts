import { IsString, IsNotEmpty, IsOptional, IsNumber, IsDate, IsArray } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreatePromotionDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  cover: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  keywords?: string[];

  @IsOptional()
  @IsString()
  content?: string;

  @IsNumber()
  @Type(() => Number)
  price: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number) 
  max_price?: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @Transform(({ value }) => new Date(value)) // Transform the input string to Date object
  end_date?: Date;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  relevant_promotion?: string[];
}
