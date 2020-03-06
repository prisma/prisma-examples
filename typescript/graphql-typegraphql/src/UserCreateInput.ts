import { InputType, Field } from "type-graphql"
import { IsEmail } from "class-validator"

@InputType()
export class UserCreateInput {

  @Field()
  @IsEmail()  
  email: string;

  @Field(type => String, { nullable: true })
  name?: string | null; 
}