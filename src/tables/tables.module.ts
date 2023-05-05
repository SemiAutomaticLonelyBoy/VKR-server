import { Module } from '@nestjs/common';
import { TablesService } from './tables.service';
import { TablesController } from './tables.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Tables} from "./table.model";
import {User} from "../users/user.model";
import {Projects} from "../projects/project.model";

@Module({
  providers: [TablesService],
  controllers: [TablesController],
  imports: [
    SequelizeModule.forFeature([Tables, User, Projects])
  ],
  exports: [
    TablesService
  ]
})
export class TablesModule {}
