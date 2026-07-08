import { IsIn, IsObject, IsOptional, IsString, Matches } from 'class-validator';

export class CreateCmsPageDto {
  @IsString()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  slug: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsIn(['draft', 'published'])
  status?: string;

  @IsOptional()
  @IsObject()
  content?: Record<string, unknown>;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}
