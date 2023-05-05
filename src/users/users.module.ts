import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./user.model";
import {Tables} from "../tables/table.model";
import {Projects} from "../projects/project.model";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
      SequelizeModule.forFeature([User, Tables, Projects])
  ],
    exports: [
       UsersService
    ]
})
export class UsersModule {}
