import {IsNotEmpty} from "class-validator";

export class CreateEmailDto{
   @IsNotEmpty()
   readonly email: string;

   @IsNotEmpty()
   readonly name: string;
}