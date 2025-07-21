import { IsOptional, IsPositive, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  
  /**
   * Número da página atual
   * Decoradores aplicados:
   * @IsOptional() - O campo é opcional
   * @Type(() => Number) - Converte o valor recebido para Number
   * @IsPositive() - Deve ser um número positivo
   * @Min(1) - Valor mínimo permitido é 1
   * Valor padrão: 1
   */
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  @Min(1)
  page?: number = 1;

  /**
   * Número de itens por página
   * Decoradores aplicados:
   * @IsOptional() - O campo é opcional
   * @Type(() => Number) - Converte o valor recebido para Number
   * @IsPositive() - Deve ser um número positivo
   * @Min(1) - Valor mínimo permitido é 1
   * Valor padrão: 10
   */
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  @Min(1)
  limit?: number = 10;
}