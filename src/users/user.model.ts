import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {ApiProperty, ApiResponse} from "@nestjs/swagger";
import {Tables} from "../tables/table.model";
import {Projects} from "../projects/project.model";


interface UserCreationAttrs{
    email: string;
    password: string;
}
@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({example: '1'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({example: 'name'})
    @Column({type: DataType.STRING, unique:true})
    userName: string;

    @ApiProperty({example: 'string@mail.com'})
    @Column({type: DataType.STRING, unique: true, allowNull: false })
    email: string;
    @ApiProperty({example: 'string'})
    @Column({type: DataType.STRING, allowNull: false })
    password: string;

    @HasMany(() => Projects)
    projects: Projects[]


}