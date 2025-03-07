import { IsNotEmpty } from 'class-validator';

export class CreateChatHistoryItemDto {
  @IsNotEmpty({ message: '内容不能为空' })
  content: string;

  @IsNotEmpty({ message: '类型不能为空' })
  type: string;

  @IsNotEmpty({ message: '父级ID为空' })
  chat_history_id: string;
}
