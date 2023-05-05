import {ApiProperty} from "@nestjs/swagger";

export class CreateTableDto {
    @ApiProperty({example: 'string'})
    readonly name: string;
    @ApiProperty({example: 'string'})
    readonly userName: string;
    @ApiProperty({example: 'string'})
    readonly projectId: string;
    @ApiProperty({example: [{label: 'string', type: 'string'}]})
    readonly columns: [{label: string, type: 'string' | 'integer' | 'boolean'}];
}