import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeleteResponseDto implements DeleteResponse {
  @Field() message: string;
  @Field() delete: boolean;
}
