import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { PrintLog } from 'libs/decorators/print-log.decorator';
import { Public } from 'libs/decorators/public.decorator';
import { ResponseMessage } from 'libs/decorators/response-message.decorator';

@Controller('files')
export class FileController {

  @Public()
  @Post('upload')
  @PrintLog
  @ResponseMessage('Upload single file')
  @UseInterceptors(FileInterceptor('fileUpload'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      fileName: file.filename
    };
  }
}
