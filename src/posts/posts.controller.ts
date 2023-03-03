import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes, Query } from '@nestjs/common';

import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { QueryPost } from './dto/query-post.dto';
import { ReviewPostDto } from './dto/review.post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Post('review/:id')
  @UsePipes(ValidationPipe)
  sendPostulation(@Body() reviewPostDto: ReviewPostDto, @Param('id') id: string) {
    return this.postsService.sendPostulation(id, reviewPostDto);
  }

  @Get()
  findAll(@Query() queryPost: QueryPost) {
    return this.postsService.findAll(queryPost);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Get('/user/:id')
  findOneByUserId(@Param('id') id: string, @Query() queryPost: QueryPost) {
    return this.postsService.findOneByUserId(id, queryPost);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
