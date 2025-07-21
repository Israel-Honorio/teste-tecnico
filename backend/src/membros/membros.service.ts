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
  // Injeta o serviço Prisma para interagir com o banco de dados
  // @param prisma - Instância do PrismaService para acesso ao banco de dados
  constructor(private prisma: PrismaService) {}

  // Cria um novo membro
  // @param createMembroDto - Dados do membro a ser criado
  // @returns O membro criado
  // @throws ConflictException se o email já estiver em uso
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

  // Busca todos os membros com paginação
  // @param paginationDto - Parâmetros de paginação (página, limite)
  // @returns Lista de membros paginada com metadados
  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const [membros, total] = await Promise.all([
      this.prisma.membros.findMany({
        skip,
        take: limit,
        orderBy: { created_at: 'desc' }, // Ordena por data de criação decrescente
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

  // Busca um membro específico pelo ID
  // @param id - ID do membro a ser buscado
  // @returns O membro encontrado
  // @throws NotFoundException se o membro não for encontrado
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

  // Atualiza as informações de um membro
  // @param id - ID do membro a ser atualizado
  // @param updateMembroDto - Dados a serem atualizados do membro
  // @returns O membro atualizado
  // @throws NotFoundException se o membro não for encontrado
  // @throws ConflictException se o email já estiver em uso
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

  // Remove um membro pelo ID
  // @param id - ID do membro a ser removido
  // @returns o membro removido
  // @throws NotFoundException se o membro não for encontrado
  async remove(id: number) {
    await this.findOne(id);

    return await this.prisma.membros.delete({
      where: { id },
    });
  }
}
