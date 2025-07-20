import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { MembrosService } from './membros.service';
import { CreateMembroDto } from './dto/create-membro.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UpdateMembroDto } from './dto/update-membro.dto';

@Controller('membros')
export class MembrosController {
    constructor(private readonly membrosService: MembrosService) {}

    @Post()
    create(@Body(ValidationPipe) createMembroDto: CreateMembroDto) {
        return this.membrosService.create(createMembroDto);
    }

    @Get()
    findAll(@Query(ValidationPipe) paginationDto: PaginationDto) {
        return this.membrosService.findAll(paginationDto);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.membrosService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateMembroDto: UpdateMembroDto) {
        return this.membrosService.update(id, updateMembroDto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.membrosService.remove(id);
    }
}
