import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { MembrosService } from './membros.service';
import { CreateMembroDto } from './dto/create-membro.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UpdateMembroDto } from './dto/update-membro.dto';

@Controller('membros')
export class MembrosController {
    constructor(private readonly membrosService: MembrosService) {}

    
    // Rota para criar um novo membro
    // @param createMembroDto - Dados do membro a ser criado
    // @returns O membro criado
    @Post()
    create(@Body(ValidationPipe) createMembroDto: CreateMembroDto) {
        return this.membrosService.create(createMembroDto);
    }

    // Obtém todos os membros com paginação
    // @param paginationDto Parâmetros de paginação validados (página, limite)
    // @returns Lista de membros paginada
    @Get()
    findAll(@Query(ValidationPipe) paginationDto: PaginationDto) {
        return this.membrosService.findAll(paginationDto);
    }

    // Obtém um membro específico pelo ID
    // @param id - ID do membro a ser buscado
    // @returns O membro encontrado
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.membrosService.findOne(id);
    }

    // Atualiza as informações de um membro
    // @param id - ID do membro a ser atualizado
    // @param updateMembroDto - Dados atualizados do membro
    // @returns O membro atualizado
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateMembroDto: UpdateMembroDto) {
        return this.membrosService.update(id, updateMembroDto);
    }

    // Remove um membro pelo ID
    // @param id - ID do membro a ser removido 
    // @returns Confirmação da remoção
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.membrosService.remove(id);
    }
}
