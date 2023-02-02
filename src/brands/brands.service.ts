import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {


  constructor(
    @InjectModel(Brand.name)
    private readonly brandModel: Model<Brand>
  ) { }

  async create(createBrandDto: CreateBrandDto) {
    return await this.brandModel.create({
      brandName: createBrandDto.brandName.charAt(0).toUpperCase() + createBrandDto.brandName.slice(1),
      value: createBrandDto.brandName.split(' ').join('-')
    });
  }

  async findAll() {
    return await this.brandModel.find({}).sort({ createdAt: 'desc' });
  }

  findOne(id: number) {
    return `This action returns a #${id} brand`;
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return `This action updates a #${id} brand`;
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}
