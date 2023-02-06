import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { isValidObjectId, Model } from 'mongoose';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { QueryPost } from './dto/query-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {

  constructor(
    @InjectModel(Post.name)
    private readonly postModel: Model<Post>,
    private readonly configServices: ConfigService
  ) { }

  async create(createPostDto: CreatePostDto) {
    try {
      const post = await this.postModel.create(createPostDto)
      return post;
    } catch (error) {
      console.log(error)
      return new BadRequestException(`Error en crear el posteo mirar la consola`)
    }
  }

  async findAll(queryPost: QueryPost) {
    const { limit = 10, published = true, category, brand, skip = this.configServices.get('default_skip'), } = queryPost;
    let query = {};

    if (category) {
      query = {
        categories: category
      }
    }

    if (brand) {
      query = {
        ...query,
        brand
      }
    }

    const posts = await this.postModel.find({ ...query, published })
      .sort({ createdAt: 'desc' })
      .limit(limit)
      .skip((skip - 1))
    return {
      metadata: {
        total: await this.postModel.find({ ...query, published }).count(),
        limit: limit,
        skip: skip
      },
      posts
    }
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) throw new NotFoundException(`the id is not a valid mongo id`)

    const post = await this.postModel.findById(id)
    if (!post) throw new NotFoundException(`Post with id "${id}" not found`)


    return post;
  }

  async findOneByUserId(id: string, queryPost: QueryPost) {
    const { limit = 10, published = true, category, brand, skip = this.configServices.get('default_skip'), } = queryPost;
    let query = {};

    if (category) {
      query = {
        categories: category
      }
    }

    if (brand) {
      query = {
        ...query,
        brand
      }
    }
    const posts = await this.postModel.find({ ...query, uid: id })
      .sort({ createdAt: 'desc' })
      .limit(limit)
      .skip((skip - 1))

    return {
      metadata: {
        total: await this.postModel.find({ ...query, uid: id }).count(),
        limit: limit,
        skip: skip
      },
      posts
    }
  }

  async findOneByUserIdAndCategory(id: string, categories: string) {
    const post = await this.postModel.findOne({ uid: id, categories })
    if (!post) throw new NotFoundException(`Post with id "${id}" not found`)

    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    try {
      const post = await this.postModel.findOneAndUpdate({ _id: id }, updatePostDto, { new: true })
      return post
    } catch (error) {
      console.log(error)
      return new BadRequestException(`Error en crear el posteo mirar la consola`)
    }
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
