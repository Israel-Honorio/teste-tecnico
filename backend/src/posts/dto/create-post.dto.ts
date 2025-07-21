import { Type } from "class-transformer";
import { IsNotEmpty, IsString, IsInt, IsOptional, IsDateString } from 'class-validator';


export class CreatePostDto {
    
    // Título do post
    // @IsNotEmpty() - O campo é obrigatório
    // @IsString() - Deve ser uma string
    @IsNotEmpty()
    @IsString()
    titulo: string;

    // Texto do post
    // @IsNotEmpty() - O campo é obrigatório
    // @IsString() - Deve ser uma string
    @IsNotEmpty()
    @IsString()
    texto: string;

    // ID do autor do post
    // @IsNotEmpty() - O campo é obrigatório
    // @IsInt() - Deve ser um número inteiro
    // @Type(() => Number) - Converte o valor recebido para Number
    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    autorId: number;
    
    // Data de criação do post
    // @IsOptional() - O campo é opcional
    // @IsDateString() - Deve ser uma string representando uma data válida
    @IsOptional()
    @IsDateString()
    created_at?: string;
}