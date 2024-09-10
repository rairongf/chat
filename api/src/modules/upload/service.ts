import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class UploadImageService {
  async handle({ filename, file, bucket }: Params) {
    try {
      const s3Client = new S3Client({
        forcePathStyle: true,
        region: 'sa-east-1',
        endpoint: process.env.S3_STORAGE_URL + '/s3',
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        },
      });

      const upload = new PutObjectCommand({
        Bucket: bucket,
        Key: filename,
        ContentType: file.mimetype,
        Body: file.buffer,
      });

      return await s3Client.send(upload);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}

type Params = {
  filename: string;
  file: Express.Multer.File;
  bucket: 'images';
};