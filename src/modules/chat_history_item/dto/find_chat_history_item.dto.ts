import { IsNotEmpty } from 'class-validator';

export class FindChatHistoryItemDto {
  @IsNotEmpty({ message: '父级ID不能为空' })
  chat_history_id: string;
}
//
