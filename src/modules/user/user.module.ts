import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { usersProviders } from './user.provider';

@Module({
  controllers: [UserController],
  providers: [UserService, ...usersProviders],
  exports: [UserService, ...usersProviders],
})
export class UserModule {}
