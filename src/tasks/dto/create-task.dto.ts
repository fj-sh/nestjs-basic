import { IsNotEmpty, MaxLength } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTaskDto {
  @IsNotEmpty({ message: '名前は必須項目です。' })
  @MaxLength(255, { message: '名前は255文字以内で入力してください' })
  @Field()
  name: string;
}
