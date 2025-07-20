import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateMembroDto } from './dto/create-membro.dto';
import { UpdateMembroDto } from './dto/update-membro.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class MembrosService {
  constructor(private prisma: PrismaService) {}

  async create(createMembroDto: CreateMembroDto) {
    try {
      return await this.prisma.membros.create({
        data: createMembroDto,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Email já está em uso');
      }
      throw error;
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const [membros, total] = await Promise.all([
      this.prisma.membros.findMany({
        skip,
        take: limit,
        orderBy: { created_at: 'desc' },
        include: {
          Posts: {
            select: {
              id: true,
              titulo: true,
            },
          },
        },
      }),
      this.prisma.membros.count(),
    ]);

    return {
      data: membros,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const membro = await this.prisma.membros.findUnique({
      where: { id },
      include: {
        Posts: true,
      },
    });

    if (!membro) {
      throw new NotFoundException(`Membro com ID ${id} não encontrado`);
    }

    return membro;
  }

  async update(id: number, updateMembroDto: UpdateMembroDto) {
    await this.findOne(id);

    try {
      return await this.prisma.membros.update({
        where: { id },
        data: updateMembroDto,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Email já está em uso');
      }
      throw error;
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    return await this.prisma.membros.delete({
      where: { id },
    });
  }
}
