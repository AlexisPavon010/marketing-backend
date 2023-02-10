import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { now } from "mongoose";

@Schema()
export class User {
  @Prop({ unique: true, lowercase: true, trim: true })
  email: string;
  @Prop({ select: false })
  password: string;
  @Prop()
  username: string;
  @Prop({
    default: true
  })
  isActive: boolean;
  @Prop({ type: String, default: 'user' })
  role: string[];
  @Prop({ default: now() })
  createdAt: Date;
  @Prop({ default: now() })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User)