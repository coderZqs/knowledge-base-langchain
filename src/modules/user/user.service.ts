import { Inject, Injectable } from '@nestjs/common';
import User from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@Inject('USER_REPOSITORY') private userRepository: typeof User) {}
  async createUser(data) {
    return await this.userRepository.create(data);
  }

  async findUserByName(name) {
    return await this.userRepository.findOne({ where: { username: name } });
  }

  async findUserByPassword({ username, password }) {
    return await this.userRepository.findOne({
      where: { username: username, password: password },
    });
  }
}
