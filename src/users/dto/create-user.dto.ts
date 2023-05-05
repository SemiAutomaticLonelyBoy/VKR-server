import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: 'string'})
    readonly email: string;
    @ApiProperty({example: 'string'})
    readonly password: string;
    @ApiProperty({example: 'string'})
    readonly userName: string;
}