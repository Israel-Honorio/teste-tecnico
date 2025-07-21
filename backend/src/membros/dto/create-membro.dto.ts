import { IsNotEmpty, IsString, IsEmail, IsIn, IsOptional } from 'class-validator';


export class CreateMembroDto {

    // Nome do membro
    // @IsNotEmpty() - O campo é obrigatório
    // @IsString() - Deve ser uma string
    @IsNotEmpty()
    @IsString()
    nome: string;

    // Email do membro
    // @IsNotEmpty() - O campo é obrigatório
    // @IsEmail() - Deve ser um email válido
    @IsNotEmpty()
    @IsEmail()
    email: string;

    // Profissão do membro
    // @IsNotEmpty() - O campo é obrigatório
    // @IsString() - Deve ser uma string
    @IsNotEmpty()
    @IsString()
    profissao: string;


}

