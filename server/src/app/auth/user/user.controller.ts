import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Response, Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard, Roles } from '../auth/auth.helper';
import { Param } from '@nestjs/common';

@UseGuards(AuthGuard(), RoleGuard)
@Controller('api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles('admin')
  public async login(@Res() res: Response): Promise<any> {
    const users = await this.userService.getAll();
    return res.status(HttpStatus.OK).json({
      message: 'Users retrieved successfully',
      data: users,
    });
  }

  @Put('/:id/approve')
  @Roles('admin')
  public async approval(@Res() res: Response, @Param('id') id): Promise<any> {
    const user = await this.userService.approve(id);
    return res.status(HttpStatus.OK).json({
      message: 'User approved successfully',
      data: user,
    });
  }

  @Put('/:id/passwordReset')
  @Roles('admin')
  public async passwordReset(
    @Res() res: Response,
    @Param('id') id,
    @Body('data') data,
  ): Promise<any> {
    const user = await this.userService.passwordReset(id, data);
    return res.status(HttpStatus.OK).json({
      message: 'User approved successfully',
      data: user,
    });
  }
}
