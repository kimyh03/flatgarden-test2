import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {
  @Field()
  postId: number;

  @Field({ nullable: true })
  mentionedUserId?: number;

  @Field()
  text: string;
}
