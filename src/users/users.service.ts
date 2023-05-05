import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from './user.model';
import {CreateUserDto} from "./dto/create-user.dto";

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User) {
    }

    async createUser(dto: CreateUserDto) {
        return await this.userRepository.create(dto);
    }

    async getAllUsers() {
        return await this.userRepository.findAll();
    }

    async getUserById(id: string) {
        return await this.userRepository.findOne({where: {id}, include: {all: true}})
    }

    async updateUserById(id: string, userDto: CreateUserDto) {
        return await this.userRepository.update({ ...userDto }, { where: { id: [id] } })
    }

    async deleteUserById(id: string) {
        return await this.userRepository.destroy({where: {id}})
    }

    async getUserByEmail(email: string) {
        return this.userRepository.findOne({where: {email}, include: {all: true}})
    }

}
