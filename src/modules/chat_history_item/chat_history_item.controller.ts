import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
} from '@nestjs/common';
import { ChatHistoryItemService } from './chat_history_item.service';
import { CreateChatHistoryItemDto } from './dto/create-chat_history_item.dto';
import { FindChatHistoryItemDto } from './dto/find_chat_history_item.dto';
import { ResponseInterceptor } from 'src/common/interceptors/api-result.interceptor';

@UsePipes(ValidationPipe)
@UseInterceptors(ResponseInterceptor)
@Controller('chat-history-item')
export class ChatHistoryItemController {
  constructor(
    private readonly chatHistoryItemService: ChatHistoryItemService,
  ) {}

  @Post()
  async create(@Body() createChatHistoryItemDto: CreateChatHistoryItemDto) {
    return await this.chatHistoryItemService.create(createChatHistoryItemDto);
  }

  @Get()
  async findAll(@Query() query: FindChatHistoryItemDto) {
    const data = await this.chatHistoryItemService.findAll(query);
    return { data };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatHistoryItemService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatHistoryItemService.remove(+id);
  }
}
