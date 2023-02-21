import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findOne(query: FindManyOptions<User>) {
    return this.userRepository.findOneOrFail(query);
  }

  findMany(query: FindManyOptions<User>) {
    return this.userRepository.find(query);
  }

  async updateOne(query: FindOneOptions<User>, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneOrFail(query);

    if (updateUserDto.password) {
      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(
        updateUserDto.password,
        saltOrRounds,
      );
      updateUserDto.password = hashedPassword;
    }

    const userForUpdate = { ...user, ...updateUserDto };

    const updatedUser = await this.userRepository.save(userForUpdate);

    const { password, ...responseUser } = updatedUser;

    return responseUser;
  }
}
