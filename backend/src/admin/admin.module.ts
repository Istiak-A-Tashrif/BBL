import { Module } from '@nestjs/common';
import { CmsModule } from './cms/cms.module';
import { CrudModule } from './crud/crud.module';
import { UploadsModule } from './uploads/uploads.module';

@Module({
  imports: [CmsModule, CrudModule, UploadsModule],
})
export class AdminModule {}
