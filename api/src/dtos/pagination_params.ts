import { Type } from "class-transformer";
import { IsInt, IsOptional, IsPositive, Max, Min } from "class-validator";

export class PaginationQueryParamsDTO {
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  page: number = 1;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Min(10)
  @Max(50)
  @Type(() => Number)
  limit: number = 20;
}