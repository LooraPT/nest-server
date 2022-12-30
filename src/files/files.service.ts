import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {

    async createProfileImg(img: Express.Multer.File): Promise<string> {
        try {
            const fileName = uuid.v4() + '.jpg';
            const filePath = path.resolve(__dirname, '..', 'static')
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true })
            }
            fs.writeFileSync(path.join(filePath, fileName), img.buffer)
            return fileName;
        } catch (e) {
            throw new HttpException('file is not create', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async deleteProfileImg(img: string): Promise<void> {
        try {
            const filePath = path.resolve(__dirname, '..', 'static', img)
            if (!fs.existsSync(filePath)) {
                return null;
            }
            fs.unlinkSync(filePath);
        } catch (e) {
            throw new InternalServerErrorException()
        }
    }

}
