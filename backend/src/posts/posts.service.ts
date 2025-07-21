import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  // Injeção de dependência do serviço Prisma
  // @param prisma - Serviço Prisma para interagir com o banco de dados
  constructor(private prisma: PrismaService) {}

  // Cria um novo post
  // @param createPostDto - Dados do post a ser criado
  // @returns O post criado com dados do autor
  async create(createPostDto: CreatePostDto) {
    const { created_at, ...postData } = createPostDto;

    return await this.prisma.posts.create({
      data: {
        ...postData,
        created_at: created_at ? new Date(created_at) : new Date(),
      },
      include: {
        autor: {
          select: {
            id: true,
            nome: true,
            email: true,
          },
        },
      },
    });
  }

  // Busca todos os posts com paginação
  // @param paginationDto - Parâmetros de paginação (página, limite)
  // @returns Lista de posts paginada com metadados
  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      this.prisma.posts.findMany({
        skip,
        take: limit,
        orderBy: { created_at: 'desc' }, // Ordena por data de criação decrescente
        include: {
          autor: {
            select: {
              id: true,
              nome: true,
              email: true,
            },
          },
        },
      }),
      this.prisma.posts.count(), // Conta o total de posts
    ]);

    return {
      data: posts,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit), // Calcula o total de páginas
      },
    };
  }

  // Busca um post específico pelo ID
  // @param id - ID do post a ser buscado
  // @returns O post encontrado com dados do autor
  // @throws NotFoundException se o post não for encontrado
  async findOne(id: number) {
    const post = await this.prisma.posts.findUnique({
      where: { id },
      include: {
        autor: {
          select: {
            id: true,
            nome: true,
            email: true,
            profissao: true,
          },
        },
      },
    });

    if (!post) {
      throw new NotFoundException(`Post com ID ${id} não encontrado`);
    }

    return post;
  }
  // Atualiza as informações de um post
  // @param id - ID do post a ser atualizado
  // @param updatePostDto - Dados validados do post
  // @returns O post atualizado com dados do autor
  async update(id: number, updatePostDto: UpdatePostDto) {
    await this.findOne(id);

    return await this.prisma.posts.update({
      where: { id },
      data: updatePostDto,
      include: {
        autor: {
          select: {
            id: true,
            nome: true,
            email: true,
          },
        },
      },
    });
  }

  // Remove um post pelo ID
  // @param id - ID do post a ser removido
  // @returns O post removido
  async remove(id: number) {
    await this.findOne(id);

    return await this.prisma.posts.delete({
      where: { id },
    });
  }

  // Busca posts de um autor específico com paginação
  // @param autorId - ID do autor cujos posts serão buscados
  // @param paginationDto - Parâmetros de paginação (página, limite)
  // @returns Lista de posts do autor paginada com metadados
  async findByAutor(autorId: number, paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      this.prisma.posts.findMany({
        where: { autorId },
        skip,
        take: limit,
        orderBy: { created_at: 'desc' },
        include: {
          autor: {
            select: {
              id: true,
              nome: true,
              email: true,
            },
          },
        },
      }),
      this.prisma.posts.count({
        where: { autorId },
      }),
    ]);

    return {
      data: posts,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}