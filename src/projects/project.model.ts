import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/user.model";
import {Tables} from "../tables/table.model";

interface ProjectCreationAttrs {

}
@Table({tableName: 'projects'})
export class Projects extends Model<Projects, ProjectCreationAttrs> {
    @ApiProperty({example: '1'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @ApiProperty({example: 'string'})
    @Column({type: DataType.STRING, unique: true})
    projectName: string

    @ApiProperty({example: 'string'})
    @Column({type: DataType.STRING, unique: true})
    key: string

    @ApiProperty({example: true})
    @Column({type: DataType.BOOLEAN})
    isPrivate: boolean

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number

    @BelongsTo(() => User)
    author: User

    @HasMany(() => Tables)
    tables: Tables[]
}