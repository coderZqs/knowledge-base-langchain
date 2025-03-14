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
  Post,
  UploadedFile,
} from '@nestjs/common';
import { ChainService } from './chain.service';
import axios from 'axios';
import { Observable } from 'rxjs';
import { ResponseInterceptor } from 'src/common/interceptors/api-result.interceptor';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { FileInterceptor } from '@nestjs/platform-express';
import * as FormData from 'form-data';
import { Public } from 'src/common/decorators/auth.docorator';

@Controller('chain')
export class ChainController {
  constructor(
    private readonly chainService: ChainService,
    private readonly chatHistoryService: ChatHistoryService,
    private readonly chatHistoryItemService: ChatHistoryItemService,
  ) {}

  @Public()
  @Sse('stream')
  async create(
    @Query('input') input: string,
    @Query('chat_history_id') chat_history_id: number,
    @Request() req,
  ) {
    console.log(32321);
    // const userId = req.user.id;

    const chatHistory = await this.chatHistoryItemService.findAll({
      chat_history_id: chat_history_id,
    });

    const data = await axios.post('http://127.0.0.1:5000/invoke', {
      memory: chatHistory,
      input: input,
    });

    console.log(data);

    await this.chatHistoryItemService.create({
      type: 0,
      content: input,
      chat_history_id,
    });

    await this.chatHistoryItemService.create({
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

  @UsePipes(ValidationPipe)
  @UseInterceptors(ResponseInterceptor)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFIle(@UploadedFile() file) {
    const fileName = decodeURIComponent(escape(file.originalname));
    const file_path = path.join(
      __dirname,
      `../../../public/uploads/${fileName}`,
    );

    console.log(process.cwd());

    fs.writeFileSync(file_path, file.buffer);
    // const t = fs.createReadStream(file_path);

    // const formData = new FormData();
    // formData.append('file', t);
    // formData.append('name', '321312');

    const data = await axios.post('http://127.0.0.1:5000/doc', {
      path: process.cwd() + '/public/uploads/' + fileName,
    });

    console.log(data.data);

    return {
      data: data.data,
    };
  }
}
