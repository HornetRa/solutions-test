import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Project {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  url: string;
}
