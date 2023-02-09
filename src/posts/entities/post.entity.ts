import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { Document, now } from "mongoose";

@Schema()
export class Post extends Document {

  @Prop()
  uid: string;
  @Prop()
  categories: string;
  @Prop()
  core_target: string;
  @Prop()
  brand: string;
  @Prop()
  description: string;
  @Prop()
  title: string;
  @Prop()
  result: string;
  @Prop()
  duration: number;
  @Prop({
    default: false
  })
  published: boolean;
  @Prop({
    default: 'pending'
  })
  status: 'approved' | 'decline' | 'rejected' | 'pending';
  @Prop({
    default: 0
  })
  adminScore: number;
  @Prop({
    default: 0
  })
  juryScore: number;
  @Prop({ default: now() })
  createdAt: Date;
  @Prop({ default: now() })
  updatedAt: Date;

  @Prop([{ type: String }])
  images: string[]

  @Prop([{ type: String }])
  videos: string[]

  @Prop()
  email: string

  @Prop()
  username: string

  @Prop()
  photoURL: string

}

export const PostSchema = SchemaFactory.createForClass(Post)
