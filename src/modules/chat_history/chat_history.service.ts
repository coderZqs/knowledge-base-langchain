import { Inject, Injectable } from '@nestjs/common';
import { CreateChatHistoryDto } from './dto/create-chat_history.dto';

@Injectable()
export class ChatHistoryService {
  constructor(
    @Inject('CHAT_HISTORY_REPOSITORY') private chatHistoryRepository,
  ) {}

  async create(params) {
    return await this.chatHistoryRepository.create({
      ...params,
    });
  }

  async findAll(user_id) {
    return await this.chatHistoryRepository.findAll({
      user_id: user_id,
    });
  }

  async findOne(id: number) {
    return await this.chatHistoryRepository.findOne(id);
  }

  async remove(id: number) {
    return await this.chatHistoryRepository.delete(id);
  }
}
