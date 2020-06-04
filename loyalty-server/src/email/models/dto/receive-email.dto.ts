import {IsNotEmpty} from "class-validator";

export class ReceiveEmailDto {
    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    readonly points: number;

    readonly file: any;

    @IsNotEmpty()
    readonly service_charge: number;

    @IsNotEmpty()
    readonly total: number;

}