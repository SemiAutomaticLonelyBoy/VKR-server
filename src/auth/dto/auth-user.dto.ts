import {ApiProperty} from "@nestjs/swagger";

export class AuthUserDto {
    @ApiProperty({example: 'string'})
    readonly email: string;
    @ApiProperty({example: 'string'})
    readonly password: string;
}