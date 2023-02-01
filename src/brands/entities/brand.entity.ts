import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Brand {

  @Prop()
  brandName: string
  @Prop()
  value: string
}

export const BrandSchema = SchemaFactory.createForClass(Brand)
