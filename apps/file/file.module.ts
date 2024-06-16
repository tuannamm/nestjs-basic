import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import { FileService } from './file.service';
import { FileController } from './file.controller';
import { MulterConfigService } from './multer.config';

@Module({
  imports: [MulterModule.registerAsync({ useClass: MulterConfigService })],
  controllers: [FileController],
  providers: [FileService, MulterConfigService]
})
export class FileModule {}
