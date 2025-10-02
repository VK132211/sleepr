import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUerDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcryptjs';
import { GetUserDto } from './dto/get-user.dto';
@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}
  async create(createUserDto: CreateUerDto) {
    await this.validateCreateUserDto(createUserDto);
    return this.userRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    });
  }
  private async validateCreateUserDto(createUserDto: CreateUerDto) {
    const userWithEmail = await this.userRepository.findOne({
      email: createUserDto.email,
    });
    if (userWithEmail) {
      throw new UnauthorizedException('User with this email already exists!');
    }
  }
  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ email });
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Creds are not valid!');
    }
    return user;
  }
  async getUser(getUserDto: GetUserDto) {
    const user = await this.userRepository.findOne(getUserDto);
    return user;
  }
}
