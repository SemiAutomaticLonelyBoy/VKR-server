import {ApiProperty} from "@nestjs/swagger";

export class CreateProjectDto {
    @ApiProperty({example: 'string'})
    readonly projectName: string;
    @ApiProperty({example: 'string'})
    readonly userId: string;
}