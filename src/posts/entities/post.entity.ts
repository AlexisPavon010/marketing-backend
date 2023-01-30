import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { Document, now } from "mongoose";

@Schema()
export class Post extends Document {

  @Prop()
  uid: string;
  @Prop()
  categories: string;
  @Prop()
  brand: string;
  @Prop()
  description: string;
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
  score: number;
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
  displayName: string

  @Prop()
  photoURL: string

}

export const PostSchema = SchemaFactory.createForClass(Post)
