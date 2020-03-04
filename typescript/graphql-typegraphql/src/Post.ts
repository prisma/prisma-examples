import "reflect-metadata";
import { ObjectType, Field, ID, InputType } from "type-graphql"
import { IsEmail } from "class-validator"
import { User } from "./User"

@ObjectType()
export class Post {
  @Field(type => ID) // Auto-generated
  id: number;

  @Field()  
  title: string;

  // From docs: We should be aware that when we declare our type as a nullable union (e.g. string | null), we need to explicitly provide the type to the @Field decorator.

  @Field(type => String, { nullable: true })  
  content: string | null;

  @Field(type => Boolean, { nullable: true })
  published?: boolean | null;  

  @Field(type => User, {nullable: true})
  author?: User | null;
}

@InputType()
export class PostCreateInput {

  @Field()  
  title: string;

  @Field(type => String, { nullable: true })  
  content: string | null;

  @Field(type => Boolean, { nullable: true })
  published?: boolean | null = false;

  @Field(type => String, { nullable: true})
  @IsEmail()
  email: string | null;
}