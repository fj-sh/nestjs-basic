import { Field, ObjectType } from '@nestjs/graphql';
import { DeleteResponse } from '../interfaces/delete-response.interface';

@ObjectType()
export class DeleteResponseDto implements DeleteResponse {
  @Field() message: string;
  @Field() delete: boolean;
}
