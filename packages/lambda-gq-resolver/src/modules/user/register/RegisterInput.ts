/* eslint-disable import/prefer-default-export */
import { MaxLength, Length, IsEmail, IsOptional } from 'class-validator';
import { Field, ID, InputType } from 'type-graphql';
import { IsEmailAlreadyExist } from './isEmailAlreadyExist';
import { IsIdAlreadyExist } from './isIdAlreadyExist';

@InputType()
export class RegisterInput {
  @IsEmailAlreadyExist()
  @Field(() => ID, { nullable: true })
  id: string;

  @Field()
  @Length(1, 255)
  firstName: string;

  @Field()
  @Length(1, 255)
  lastName: string;

  @Field()
  @IsEmail()
  email: string;
}
