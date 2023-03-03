import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { isValidObjectId, Model } from 'mongoose';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { QueryPost } from './dto/query-post.dto';
import { Post } from './entities/post.entity';
import { ReviewPostDto } from './dto/review.post.dto';

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
    const { limit = 10, published = true, category, brand, status, juryScore, skip = this.configServices.get('default_skip'), } = queryPost;
    let query = {};
    let sort: any = {
      createdAt: 'desc'
    }

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

    if (status) {
      query = {
        ...query,
        status
      }
    }

    if (juryScore) {
      sort = {
        juryScore: juryScore
      }
    }

    const posts = await this.postModel.find({ ...query, published })
      .sort(sort)
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

  async sendPostulation(id: string, reviewPostDto: ReviewPostDto) {
    try {
      const post = await this.postModel.findById(id);

      if (post) {
        const alreadyPostedIndex = post.reviews.findIndex(
          (r: any) => r.user.toString() === reviewPostDto.userId
        );

        if (alreadyPostedIndex !== -1) {
          // Actualizar puntuación de postulación existente
          post.reviews[alreadyPostedIndex].score = Number(reviewPostDto.score);
        } else {
          // Crear nueva postulación
          const newReview: any = {
            name: reviewPostDto.name,
            score: Number(reviewPostDto.score),
            user: reviewPostDto.userId,
          };
          post.reviews.push(newReview);
          post.numReviews = post.reviews.length;
        }

        post.scored = true;

        // Calcular promedio de puntuaciones de jurados
        const juryScores = post.reviews.map((review: any) => review.score);
        post.juryScore = juryScores.reduce((total: number, score: number) => total + score, 0) / juryScores.length;

        await post.save();

        return post;
      } else {
        return new NotFoundException(`No se encontró el post`);
      }
    } catch (error) {
      console.log(error);
      return new BadRequestException(`Error en crear el posteo, ver la consola para más detalles`);
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
      .sort({ createdAt: 'desc', juryScore: 'desc' })
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

  async update(id: string, updatePostDto: UpdatePostDto) {
    try {
      const post = await this.postModel.findOneAndUpdate({ _id: id }, updatePostDto, { new: true })
      return post
    } catch (error) {
      console.log(error)
      return new BadRequestException(`Error en crear el posteo mirar la consola`)
    }
  }

  remove(id: string) {
    try {
      return this.postModel.findByIdAndDelete(id)
    } catch (error) {
      console.log(error)
      return new NotFoundException('El documento por su id no fuen encontrado');
    }
  }
}
