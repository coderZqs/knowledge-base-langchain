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
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { ChatZhipuAI } from '@langchain/community/chat_models/zhipuai';
import { PromptTemplate } from '@langchain/core/prompts';
import { BufferMemory } from 'langchain/memory';
import {} from '@langchain/community/document_loaders/web/youtube';
import { ResponseInterceptor } from 'src/common/interceptors/api-result.interceptor';
import { CharacterTextSplitter } from '@langchain/textsplitters';
import { TextLoader } from 'langchain/document_loaders/fs/text';
import { fstat } from 'fs';
import * as path from 'path';

const llm = new ChatZhipuAI({
  model: 'GLM-4-Flash', // Available models:
  temperature: 1,
  zhipuAIApiKey: 'cf410bd67d4a4a23a62cd64bd63e41c3.d2qp97howKgS0idr',
});

const memory = new BufferMemory();

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
    const userId = req.user.id;
    try {
      const docs = await new TextLoader(
        path.join(__dirname, '../../../public/1.txt'),
      ).load();

      docs[0].pageContent;
    } catch (e) {
      console.log(e);
    }
    /*     const textSplitter = new CharacterTextSplitter({
      chunkSize: 100,
      chunkOverlap: 0,
    });
    const texts = await textSplitter.splitText([docs]); */

    /**+
     * 1. 获取用户输入
     * 2. 结合聊天记录
     * 3. RAG检索
     * 4. 调用模型进行处理
     * 5. 将结果推送给客户端
     */

    /*     this.chatHistoryItemService.create({
      type: 0,
      content: input,
      chat_history_id,
    });

    const stream = await llm.stream(input);
    let message = '';
    return new Observable((observer) => {
      (async () => {
        observer.next({ data: { value: uuidv4(), type: 'START' } });

        for await (const chunk of stream) {
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
        });
      })();
    }); */
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chainService.findOne(+id);
  }
}
