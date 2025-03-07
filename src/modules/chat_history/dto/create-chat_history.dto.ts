import { IsNotEmpty } from 'class-validator';

export class CreateChatHistoryDto {
  @IsNotEmpty({ message: '标题不能为空' })
  title: string;
}
