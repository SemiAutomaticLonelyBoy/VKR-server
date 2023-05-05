import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {ProjectsService} from "./projects.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateProjectDto} from "./dto/create-project.dto";
import {User} from "../users/user.model";
@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
    constructor(private projectService: ProjectsService) {
    }

    @Post()
    @ApiResponse({status: 200})
    @ApiOperation({ summary: 'Создаёт проект' })
    create(@Body() projectDto: CreateProjectDto) {
        return this.projectService.createProject(projectDto)
    }

    @Get(':project')
    @ApiResponse({status: 200, type: User})
    @ApiOperation({ summary: 'Получает проект по имени' })
    getById(@Param('project') project: string) {
        return this.projectService.getProjectByName(project)
    }

    @Delete(':project')
    @ApiResponse({status:200})
    @ApiOperation({ summary: 'Удаляет проект по имени' })
    delete(@Param('project') project: string) {
        return this.projectService.deleteProjectByName(project);
    }

}
