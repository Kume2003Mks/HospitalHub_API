import { IsString } from "class-validator";

export class ContactDto {

    @IsString()
    readonly name: string;

    @IsString()
    readonly email: string;

    @IsString()
    readonly phone: string;

    @IsString()
    readonly detail: string;
}
