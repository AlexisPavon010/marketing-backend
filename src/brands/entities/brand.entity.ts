import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { now } from "mongoose";

@Schema()
export class Brand {

  @Prop()
  brandName: string
  @Prop()
  value: string
  @Prop({ default: now() })
  createdAt: Date;
  @Prop({ default: now() })
  updatedAt: Date;
}

export const BrandSchema = SchemaFactory.createForClass(Brand)
