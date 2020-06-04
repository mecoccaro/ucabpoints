import {IsNotEmpty} from "class-validator";

export class StatusEmailDto {
    @IsNotEmpty()
    readonly id: number;

    @IsNotEmpty()
    readonly status: string;

    @IsNotEmpty()
    readonly email: string;
}