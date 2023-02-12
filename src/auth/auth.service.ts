import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt'
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'

import { User } from './entities/user.entity';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly JwtService: JwtService

  ) { }

  async users() {
    return await this.userModel.find({})
  }

  async create(createUserDto: CreateUserDto) {
    try {

      const { password, ...userData } = createUserDto;

      const userDb = await this.userModel.create({
        ...userData,
        password: bcrypt.hashSync(password, 10)
      })

      const user = userDb.toJSON()
      delete user.password

      return {
        ...user,
        token: this.getJwtToken({ id: userDb.id })
      };

    } catch (error) {
      this.handleDbErrors(error)
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;
    const userDb = await this.userModel.findOne()
      .where({ email })
      .select({ email: true, password: true, _id: true, isActive: true, role: true, username: true })

    if (!userDb) throw new UnauthorizedException('El usuario o contraseña no son correctas');

    if (!bcrypt.compareSync(password, userDb.password)) throw new UnauthorizedException('El usuario o contraseña no son correctas');

    const user = userDb.toJSON()
    delete user.password

    return {
      ...user,
      token: this.getJwtToken({ id: userDb.id })
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findOneAndUpdate({ _id: id }, updateUserDto, { new: true })
  }

  private getJwtToken(payload: JwtPayload) {
    return this.JwtService.sign(payload);
  }

  private handleDbErrors(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException('El usuario ya existe!');

    }
    console.log(error)
    throw new InternalServerErrorException('Please check server logs');
  }

}