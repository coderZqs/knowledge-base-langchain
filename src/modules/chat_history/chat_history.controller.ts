import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Request,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  Req,
} from '@nestjs/common';
import { ChatHistoryService } from './chat_history.service';
import { CreateChatHistoryDto } from './dto/create-chat_history.dto';
import { ResponseInterceptor } from 'src/common/interceptors/api-result.interceptor';

@Controller('chat-history')
@UsePipes(ValidationPipe)
@UseInterceptors(ResponseInterceptor)
export class ChatHistoryController {
  constructor(private readonly chatHistoryService: ChatHistoryService) {}

  @Post()
  async create(@Body() createChatHistoryDto: CreateChatHistoryDto, @Req() req) {
    const user_id = req.user.id;
    return await this.chatHistoryService.create({
      ...createChatHistoryDto,
      user_id,
    });
  }

  @Get()
  async findAll(@Request() req) {
    const data = await this.chatHistoryService.findAll({
      user_id: req.user.id,
    });

    return {
      data,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatHistoryService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatHistoryService.remove(+id);
  }
}
