import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { User } from './schemas/user.schema';
import { UserService } from './services/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const result = await this.userService.login(email, password);
      res.json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      res.json({
        error: error.message,
      });
    }
  }

  @Post('register')
  async register(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('role') role: number,
    @Body('fullname') fullname: string,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const user: User = {
        email,
        password,
        role,
        fullname,
      };
      return this.userService.register(user);
    } catch (error: any) {
      res.json({
        error: error.message,
      });
    }
  }
}
