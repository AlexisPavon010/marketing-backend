import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport'
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt'

import { User } from '../entities/user.entity'
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>
  ) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    })
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { id } = payload
    const userDb = await this.userModel.findById(id)

    if (!userDb) throw new UnauthorizedException("El token es invalido");

    if (!userDb.isActive) throw new UnauthorizedException("El usuario esta desactivado, hablar con el administrador");

    return userDb;
  }
}