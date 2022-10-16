import { IsNotEmpty } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteTaskDto {
  @IsNotEmpty({ message: 'IDは必須項目です' })
  @Field()
  id: number;
}
