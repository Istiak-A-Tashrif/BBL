import { Controller, Get, Param, Query } from '@nestjs/common';
import { CmsService } from './cms.service';

@Controller()
export class CmsController {
  constructor(private readonly cmsService: CmsService) {}

  @Get('cms/pages/:slug')
  findPublishedBySlug(@Param('slug') slug: string) {
    return this.cmsService.findPublishedBySlug(slug);
  }

  @Get('cms/page')
  findPublishedBySlugQuery(@Query('slug') slug: string) {
    return this.cmsService.findPublishedBySlug(slug);
  }
}
