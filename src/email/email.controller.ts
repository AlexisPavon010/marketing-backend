import { Controller, Post, Body } from '@nestjs/common';
import { PostulationDto, RecoveryPassword, SendEmailDto } from './dto';
import { ResetPassword } from './dto/reset-password.dto';

import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) { }

  @Post()
  send(@Body() sendEmailDto: SendEmailDto) {
    return this.emailService.send(sendEmailDto);
  }

  @Post('reset')
  reset(@Body() resetPassword: ResetPassword) {
    return this.emailService.reset(resetPassword);
  }

  @Post('recovery')
  recovery(@Body() recoveryPassword: RecoveryPassword) {
    return this.emailService.recovery(recoveryPassword);
  }

  @Post('postulation')
  postulation(@Body() postulationDto: PostulationDto) {
    return this.emailService.postulation(postulationDto)
  }
}
