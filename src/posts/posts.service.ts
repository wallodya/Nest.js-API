import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { createPostDto } from './dto/createPostDto';
import { Post } from './posts.model';

@Injectable()
export class PostsService {

    constructor(
        @InjectModel(Post) private postRepo: typeof Post,
        private fileService: FilesService
    ) {}

    async create(dto: createPostDto, image) {
        const fileName = await this.fileService.createFile(image)
        const post = await this.postRepo.create({...dto, image: fileName})
        return post
    }
}
