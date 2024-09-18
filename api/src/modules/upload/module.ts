import { Global, Module } from '@nestjs/common';
import { UploadImageService } from './service';

@Global()
@Module({
  providers: [UploadImageService],
  exports: [UploadImageService],
})
export class UploadModule {}
