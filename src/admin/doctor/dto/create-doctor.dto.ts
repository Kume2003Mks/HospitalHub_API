import { IsString, IsOptional, IsInt, IsBoolean, IsArray, ArrayNotEmpty, ArrayMinSize } from 'class-validator';
import { Transform, Type } from 'class-transformer';


export class CreateDoctorDto {
  @IsString()
  name: string;

  @IsString()
  cover: string;

  @IsString()
  specialized: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  publish: boolean;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @Type(() => Number)
  @IsInt({ each: true })
  departmentId: number[];
}
