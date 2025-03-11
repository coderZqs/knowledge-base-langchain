import { ChatHistoryItemService } from './../chat_history_item/chat_history_item.service';
import { ChatHistoryService } from './../chat_history/chat_history.service';
import {
  Controller,
  Get,
  Param,
  Sse,
  Query,
  UsePipes,
  ValidationPipe,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { ChainService } from './chain.service';
import axios from 'axios';
import { Observable } from 'rxjs';
import { ResponseInterceptor } from 'src/common/interceptors/api-result.interceptor';
import { fstat } from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Controller('chain')
export class ChainController {
  constructor(
    private readonly chainService: ChainService,
    private readonly chatHistoryService: ChatHistoryService,
    private readonly chatHistoryItemService: ChatHistoryItemService,
  ) {}

  @Sse('stream')
  @UsePipes(ValidationPipe)
  @UseInterceptors(ResponseInterceptor)
  async create(
    @Query('input') input: string,
    @Query('chat_history_id') chat_history_id: number,
    @Request() req,
  ) {
    // const userId = req.user.id;

    const chatHistory = await this.chatHistoryItemService.findAll({
      chat_history_id: chat_history_id,
    });

    const data = await axios.post('http://127.0.0.1:5000/invoke', {
      memory: chatHistory,
      input: input,
    });

    this.chatHistoryItemService.create({
      type: 0,
      content: input,
      chat_history_id,
    });

    this.chatHistoryItemService.create({
      type: 1,
      content: data.data,
      chat_history_id,
    });

    return new Observable((observer) => {
      (async () => {
        observer.next({ data: { value: uuidv4(), type: 'START' } });
        observer.next({ data: { value: data.data, type: 'MESSAGE' } });
        observer.next({ data: { type: 'END' } });
        observer.complete();

        /*  for await (const chunk of stream) {
          // console.log(chunk);
          // 将流中的数据推送给客户端
          message += chunk.content;
          observer.next({ data: { value: chunk.content, type: 'MESSAGE' } });
        }
        // 流结束时关闭连接

        observer.next({ data: { type: 'END' } });
        observer.complete();

        this.chatHistoryItemService.create({
          type: 1,
          content: message,
          chat_history_id,
        }); */
      })();
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chainService.findOne(+id);
  }
}
