import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import  * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
@Injectable()
export class AuthService {

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {

  }

  createUser(createUserDto: CreateUserDto) {
    try {
      const{password, ...userData} = createUserDto;
      const user = this.userRepository.create(
        {
          password: bcrypt.hashSync(password, 10),
          ...userData
        });
      return this.userRepository.save(user);
    }
    catch (error) {
      throw new Error('Error creating user');
    }
  }
}
