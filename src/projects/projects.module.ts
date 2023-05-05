import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/user.model";
import {Tables} from "../tables/table.model";
import {Projects} from "./project.model";
import {TablesService} from "../tables/tables.service";

@Module({
  providers: [ProjectsService],
  controllers: [ProjectsController],
  imports: [
    SequelizeModule.forFeature([User, Tables, Projects])
  ],
  exports: [
    ProjectsService
  ]
})
export class ProjectsModule {}
