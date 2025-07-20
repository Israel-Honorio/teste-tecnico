import { Type } from "class-transformer";
import { IsNotEmpty, IsString, IsInt, IsOptional, IsDateString } from 'class-validator';


export class CreatePostDto {
    
    @IsNotEmpty()
    @IsString()
    titulo: string;

    @IsNotEmpty()
    @IsString()
    texto: string;

    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    autorId: number;
    
    @IsOptional()
    @IsDateString()
    created_at?: string;
}