import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

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

async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      this.prisma.posts.findMany({
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
      this.prisma.posts.count(),
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

  async remove(id: number) {
    await this.findOne(id);

    return await this.prisma.posts.delete({
      where: { id },
    });
  }

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

