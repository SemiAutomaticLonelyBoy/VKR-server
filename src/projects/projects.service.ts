import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Projects} from "./project.model";
import {CreateProjectDto} from "./dto/create-project.dto";

@Injectable()
export class ProjectsService {
    constructor(@InjectModel(Projects) private projectRepository: typeof Projects) {
    }


    async createProject (dto: CreateProjectDto){
        let key = '';
        let words = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
        let max_position = words.length - 1;
        for( let i = 0; i < 40; i++ ) {
            let position = Math.floor ( Math.random() * max_position );
            key = key + words.substring(position, position + 1);
        }

        return this.projectRepository.create({projectName: dto.projectName, key: key, isPrivate: true, userId: dto.userId})
    }

    async getProjectByName(project: string) {
        return await this.projectRepository.findOne({where: {projectName: project}, include: {all: true}})
    }

    async deleteProjectByName(project: string) {
        return await this.projectRepository.destroy({where: {projectName: project}})
    }

}
