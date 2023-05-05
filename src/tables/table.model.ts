import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/user.model";
import {Projects} from "../projects/project.model";

interface TableCreationAttrs {
    name: string;
    tableName: string;
    projectId: string;
}

@Table({tableName: 'tables'})
export class Tables extends Model<Tables, TableCreationAttrs> {
    @ApiProperty({example: '1'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @ApiProperty({example: 'string'})
    @Column({type: DataType.STRING, unique: true})
    name: string

    @ApiProperty({example: 'string'})
    @Column({type: DataType.STRING, unique: true})
    tableName: string

    @ForeignKey(() => Projects)
    @Column({type: DataType.INTEGER})
    projectId: number

    @BelongsTo(() => Projects)
    creator: Projects
}