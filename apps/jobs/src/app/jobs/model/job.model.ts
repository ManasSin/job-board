import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobModel {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;
}
