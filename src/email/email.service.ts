import { join } from 'path';
import { readFileSync } from 'fs'
import { Injectable, NotFoundException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import handlebars from 'handlebars'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'


import { PostulationDto, RecoveryPassword, SendEmailDto } from './dto';
import { User } from 'src/auth/entities/user.entity';
import { ResetPassword } from './dto/reset-password.dto';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { BadRequestException } from '@nestjs/common/exceptions';

@Injectable()
export class EmailService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly JwtService: JwtService
  ) { }

  async send(sendEmailDto: SendEmailDto) {
    const user = await this.userModel.findOne({ email: sendEmailDto.email }).lean()
    if (!user) throw new BadRequestException('El usuario no existe!');

    try {
      const htmlTemplatePath = join(__dirname, '../../src/templates/mail.html');
      const htmlTemplate = readFileSync(htmlTemplatePath, 'utf-8');

      const template = handlebars.compile(htmlTemplate);
      const replacements = {
        username: user.username
      };
      const htmlToSend = template(replacements);

      return this.SendEmail({
        from: {
          name: 'Intercorp Marketing Awards 2023',
          address: 'info@intercorpmarketingawards.com'
        },
        to: user.email,
        subject: 'Bienvenido a Intercorp Marketing Awards 2023',
        html: htmlToSend
      })

    } catch (error) {
      console.log(error)
      return error
    }
  }

  async recovery(recoveryPassword: RecoveryPassword) {
    const user = await this.userModel.findOne({ email: recoveryPassword.email }).lean()
    if (!user) throw new NotFoundException('El correo ingresado no existe')

    try {
      const token = this.getJwtToken({ id: user._id.toString() })

      const htmlTemplatePath = join(__dirname, '../../src/templates/recovery-password.html');
      const htmlTemplate = readFileSync(htmlTemplatePath, 'utf-8');

      const template = handlebars.compile(htmlTemplate);

      const replacements = {
        url: `${process.env.PUBLIC_BASE_URL}/reset-password/?token=${token}`,
        username: user.username
      };
      const htmlToSend = template(replacements);

      return this.SendEmail({
        from: process.env.HOSTINGER_USER,
        to: user.email,
        subject: 'Solicitud de cambio de contraseña',
        html: htmlToSend
      })

    } catch (error) {
      console.log(error)
      return error
    }
  }

  async reset(resetPassword: ResetPassword) {

    const decode = await this.JwtService.verifyAsync(resetPassword.token)

    const user = await this.userModel.findById(decode.id)

    user.password = bcrypt.hashSync(resetPassword.password, 10)

    delete user.password

    await user.save()

    return user
  }

  async postulation(postulationDto: PostulationDto) {
    const user = await this.userModel.findOne({ email: postulationDto.email }).lean()
    if (!user) throw new NotFoundException('El correo ingresado no existe')

    try {
      const htmlTemplatePath = join(__dirname, '../../src/templates/postulation.html');
      const htmlTemplate = readFileSync(htmlTemplatePath, 'utf-8');

      const template = handlebars.compile(htmlTemplate);
      const replacements = {
        username: user.username
      };
      const htmlToSend = template(replacements);

      return this.SendEmail({
        from: {
          name: 'Intercorp Marketing Awards 2023',
          address: 'info@intercorpmarketingawards.com'
        },
        to: user.email,
        subject: 'Postulaste tu caso con éxito a Intercorp Marketing Awards 2023',
        html: htmlToSend
      })

    } catch (error) {
      console.log(error)
      return error
    }
  }

  private getJwtToken(payload: JwtPayload) {
    return this.JwtService.sign(payload);
  }

  private async SendEmail(options) {
    try {
      const transport = nodemailer.createTransport({
        host: 'smtp.hostinger.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.HOSTINGER_USER,
          pass: process.env.HOSTINGER_PASSWORD
        }
      });

      return await transport.sendMail(options);
    } catch (error) {
      console.log(error)
      return error
    }
  }

}