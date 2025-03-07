import { Inject, Injectable } from '@nestjs/common';
import ChatHistoryItem from './entities/chat_history_item.entity';

@Injectable()
export class ChatHistoryItemService {
  constructor(
    @Inject('CHAT_HISTORY_ITEM_REPOSITORY')
    private chatHistoryItemRepository: typeof ChatHistoryItem,
  ) {}
  async create(params) {
    return await this.chatHistoryItemRepository.create({
      ...params,
    });
  }

  async findAll(query) {
    return await this.chatHistoryItemRepository.findAll({
      where: { ...query },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} chatHistoryItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} chatHistoryItem`;
  }
}
