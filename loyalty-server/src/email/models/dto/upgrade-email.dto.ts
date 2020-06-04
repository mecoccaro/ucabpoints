import {IsNotEmpty} from "class-validator";

export class UpgradeEmailDto{
    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    readonly plan: string;

    @IsNotEmpty()
    readonly name: string;
}