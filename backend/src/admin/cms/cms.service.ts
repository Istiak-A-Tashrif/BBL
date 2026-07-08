import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CmsService {
  constructor(private readonly prisma: PrismaService) {}

  async findPublishedBySlug(slug: string) {
    const page = await this.prisma.cmsPage.findFirst({
      where: { slug, status: 'published' },
    });

    if (!page) {
      throw new NotFoundException('CMS page not found');
    }

    return page;
  }
}
