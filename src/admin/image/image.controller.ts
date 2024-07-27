import { Controller, Delete, Get, Param, Post, Req, Body, UploadedFile, UseInterceptors, BadRequestException, Put, UseGuards } from '@nestjs/common';
import { ImageService } from './image.service';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { extname, join } from 'path';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('admin/image')
export class ImageController {
  constructor(private readonly imageService: ImageService) { }

  @Get()
  public findAll(@Req() req: Request) {
    return this.imageService.findAll(req);
  }

  @Get('folders')
  public getFolderNames() {
    return this.imageService.getFolderNames();
  }

  @Get(':folderName')
  public findFilesInFolder(@Param('folderName') folderName: string, @Req() req: Request) {
    return this.imageService.findFilesInFolder(folderName, req);
  }

  @Post('folder')
  public createFolder(@Body('folderName') folderName: string) {
    if (!folderName) {
      throw new BadRequestException('Folder name is required');
    }
    return this.imageService.createFolder(folderName);
  }

  @Post(':folderName')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: (req, file, callback) => {
          const folderName = req.params.folderName;
          const uploadPath = join('./uploads', folderName);
          callback(null, uploadPath);
        },
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async upload(@Param('folderName') folderName: string, @UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('No file uploaded');
    }
    console.log(file);
    return { message: 'File uploaded successfully', file };
  }

  @Put(':folderName/rename')
  public renameFolder(@Param('folderName') folderName: string, @Body('newFolderName') newFolderName: string) {
    if (!newFolderName) {
      throw new BadRequestException('New folder name is required');
    }
    return this.imageService.renameFolder(folderName, newFolderName);
  }

  @Delete(':folderName')
  public deleteFolder(@Param('folderName') folderName: string) {
    return this.imageService.deleteAllFilesInFolder(folderName);
  }

  @Delete(':folderName/:filename')
  async delete(@Param('folderName') folderName: string, @Param('filename') filename: string) {
    return this.imageService.deleteImage(folderName, filename);
  }
}
