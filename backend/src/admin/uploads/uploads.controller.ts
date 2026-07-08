import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AdminAuthGuard } from 'src/auth/guards/admin.auth.guard';

const allowedMimeTypes = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
]);

@Controller('admin/uploads')
@UseGuards(AdminAuthGuard)
export class UploadsController {
  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_req, file, callback) => {
          const safeName = file.originalname
            .replace(extname(file.originalname), '')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
          callback(null, `${Date.now()}-${safeName}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (_req, file, callback) => {
        if (!allowedMimeTypes.has(file.mimetype)) {
          return callback(new BadRequestException('Only image uploads are allowed'), false);
        }

        callback(null, true);
      },
      limits: {
        fileSize: 8 * 1024 * 1024,
      },
    }),
  )
  uploadImage(@UploadedFile() file?: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    return {
      path: `/uploads/${file.filename}`,
      filename: file.filename,
      mimetype: file.mimetype,
      size: file.size,
    };
  }
}
