import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { BrandsModule } from './brands/brands.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://test:1234Pavon@cluster0.zgmq0.mongodb.net/marketing?retryWrites=true&w=majority'),
    PostsModule,
    BrandsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
