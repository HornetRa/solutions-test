import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Experience {
  @Field()
  company: string;

  @Field()
  position: string;

  @Field()
  period: string;

  @Field(() => [String])
  achievements: string[];
}
