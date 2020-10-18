import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async approve(id: any) {
    var user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    user.approved = !user.approved;
    return await this.userRepository.update(id, user);
  }

  public async getAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async getByEmail(email: string): Promise<User> {
    console.log('email', email);
    return await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  public async getById(id: any): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  public async create(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  public async passwordReset(id: any, data) {
    var user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    user.password = crypto.createHmac('sha256', data.password).digest('hex');
    return await this.userRepository.update(id, user);
  }
}
