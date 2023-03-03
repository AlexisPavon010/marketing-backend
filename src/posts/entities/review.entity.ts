import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Types, Schema as MongooseSchema } from "mongoose";


@Schema()
export class ReviewSchema extends Document {
  @Prop({ type: String, required: true, })
  name: string;

  @Prop({ type: Number, required: true, })
  score: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', })
  user: Types.ObjectId
}

export const PostSchema = SchemaFactory.createForClass(ReviewSchema)