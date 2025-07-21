import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  // Injeção de dependência do serviço de posts
  // @param postsService - Serviço responsável pela lógica de negócios dos posts
  constructor(private readonly postsService: PostsService) {}

  // Rota para criar um novo post
  // @param createPostDto - Dados do post a ser criado
  // @returns O post criado
  @Post()
  create(@Body(ValidationPipe) createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  // Obtém todos os posts com paginação
  // @param paginationDto - Parâmetros de paginação validados (página, limite)
  // @returns Lista de posts paginada
  @Get()
  findAll(@Query(ValidationPipe) paginationDto: PaginationDto) {
    return this.postsService.findAll(paginationDto);
  }

  // Obtém posts de um autor específico com paginação
  // @param autorId - ID do autor cujos posts serão buscados
  // @param paginationDto - Parâmetros de paginação validados (página, limite)
  // @returns Lista de posts do autor paginada
  @Get('autor/:autorId')
  findByAutor(
    @Param('autorId', ParseIntPipe) autorId: number,
    @Query(ValidationPipe) paginationDto: PaginationDto,
  ) {
    return this.postsService.findByAutor(autorId, paginationDto);
  }

  // Busca um post específico pelo ID
  // @param id - ID do post a ser buscado
  // @returns O post encontrado
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findOne(id);
  }

  // Atualiza as informações de um post
  // @param id - ID do post a ser atualizado
  // @param updatePostDto - Dados validados do post
  // @returns O post atualizado
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(id, updatePostDto);
  }

  // Remove um post pelo ID
  // @param id - ID do post a ser removido
  // @returns Confirmação da remoção
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.remove(id);
  }
}
