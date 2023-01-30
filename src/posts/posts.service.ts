import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {

  constructor(
    @InjectModel(Post.name)
    private readonly postModel: Model<Post>
  ) { }

  async create(createPostDto: CreatePostDto) {
    try {
      const post = await this.postModel.create(createPostDto)
      return post;
    } catch (error) {
      console.log(error)
      return new BadRequestException(`Error en crear el posteo`)
    }
  }

  async findAll() {
    return await this.postModel.find()
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) throw new NotFoundException(`the id is not a valid mongo id`)

    const post = await this.postModel.findById(id)
    if (!post) throw new NotFoundException(`Post with id "${id}" not found`)


    return post;
  }

  async findOneByUserId(id: string, categories: string) {
    const post = await this.postModel.findOne({ uid: id, categories })
    if (!post) throw new NotFoundException(`Post with id "${id}" not found`)

    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {

    console.log(updatePostDto)

    const post = await this.postModel.findOneAndUpdate({ _id: id }, updatePostDto, { new: true })

    return post
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
