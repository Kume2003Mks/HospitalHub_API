import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePageDto {
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

    @IsOptional()
    @IsString()
    route?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    relevant_doctor?: string[];
}
