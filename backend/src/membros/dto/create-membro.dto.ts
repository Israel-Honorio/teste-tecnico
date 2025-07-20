import { IsNotEmpty, IsString, IsEmail, IsIn, IsOptional } from 'class-validator';


export class CreateMembroDto {
    @IsNotEmpty()
    @IsString()
    nome: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    profissao: string;

    @IsOptional()
    @IsIn(['Ativo', 'Inativo'])
    ativo: boolean;

}

