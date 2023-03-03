import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { Document, now } from "mongoose";
import { ReviewSchema } from "./review.entity";

@Schema()
export class Post extends Document {
  @Prop([ReviewSchema])
  reviews: [ReviewSchema]
  
  @Prop({ type: Number, default: 0 })
  numReviews: number;

  @Prop({ type: Boolean, default: false })
  scored: boolean

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
