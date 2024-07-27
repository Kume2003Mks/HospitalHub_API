import { Injectable, BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import { Request } from 'express';
import * as path from 'path';

@Injectable()
export class ImageService {
  
  async findAll(req: Request) {
    const baseUrl = req.protocol + '://' + req.get('host');
    const uploadDir = './uploads';
    const images: string[] = [];

    try {
      const folders = fs.readdirSync(uploadDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

      for (const folder of folders) {
        const folderPath = path.join(uploadDir, folder);
        const files = fs.readdirSync(folderPath)
          .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file))
          .map(file => baseUrl + '/uploads/' + folder + '/' + file);
        images.push(...files);
      }
    } catch (err) {
      console.error('Error reading directory:', err);
    }
    return images;
  }

  async getFolderNames() {
    const uploadDir = './uploads';
    try {
      const folders = fs.readdirSync(uploadDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
      return folders;
    } catch (err) {
      console.error('Error reading directory:', err);
      return [];
    }
  }

  async findFilesInFolder(folderName: string, req: Request) {
    const baseUrl = req.protocol + '://' + req.get('host');
    const folderPath = path.join('./uploads', folderName);
    let files: string[] = [];

    try {
      files = fs.readdirSync(folderPath);
      files = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
      files = files.map(file => baseUrl + '/uploads/' + folderName + '/' + file);
    } catch (err) {
      console.error('Error reading folder:', err);
    }
    return files;
  }

  async createFolder(folderName: string) {
    const folderPath = path.join('./uploads', folderName);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      return { message: 'Folder created successfully' };
    } else {
      return { message: 'Folder already exists' };
    }
  }

  async renameFolder(folderName: string, newFolderName: string) {
    const oldFolderPath = path.join('./uploads', folderName);
    const newFolderPath = path.join('./uploads', newFolderName);

    try {
      if (fs.existsSync(oldFolderPath)) {
        fs.renameSync(oldFolderPath, newFolderPath);
        return { message: 'Folder renamed successfully' };
      } else {
        throw new Error('Folder not found');
      }
    } catch (err) {
      console.error('Error renaming folder:', err);
      throw new BadRequestException('Error renaming folder');
    }
  }

  // async deleteFolder(folderName: string) {
  //   const folderPath = path.join('./uploads', folderName);

  //   try {
  //     if (fs.existsSync(folderPath)) {
  //       fs.rmdirSync(folderPath, { recursive: true });
  //       return { message: 'Folder deleted successfully' };
  //     } else {
  //       throw new Error('Folder not found');
  //     }
  //   } catch (err) {
  //     console.error('Error deleting folder:', err);
  //     throw new BadRequestException('Error deleting folder');
  //   }
  // }

  async deleteAllFilesInFolder(folderName: string) {
    const folderPath = path.join('./uploads', folderName);

    try {
      if (fs.existsSync(folderPath)) {
        fs.rmdirSync(folderPath, { recursive: true });
        return { message: 'Folder deleted successfully' };
      } else {
        throw new Error('Folder not found');
      }
    } catch (err) {
      console.error('Error deleting folder:', err);
      throw new BadRequestException('Error deleting folder');
    }
  }

  async deleteImage(folderName: string, filename: string) {
    const filePath = path.join('./uploads', folderName, filename);

    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        return { message: 'File deleted successfully' };
      } else {
        return { message: 'File not found' };
      }
    } catch (err) {
      console.error('Error deleting file:', err);
      throw new BadRequestException('Error deleting file');
    }
  }
}
