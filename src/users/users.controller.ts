import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import { User } from './user.model';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Post()
    @ApiResponse({status: 200, type: User})
    @ApiOperation({ summary: 'Добавляет пользователя' })
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto);
    }

    @Get()
    @ApiResponse({status: 200, type: [User]})
    @ApiOperation({ summary: 'Получает всех пользователей' })
    getAll() {
        return this.userService.getAllUsers();
    }

    @Get(':id')
    @ApiResponse({status: 200, type: User})
    @ApiOperation({ summary: 'Получает пользователя по id' })
    getById(@Param('id') id: string) {
        return this.userService.getUserById(id)
    }

    @Put(':id')
    @ApiResponse({status:200, type: User})
    @ApiOperation({ summary: 'Редактирует пользователя по id' })
    update(@Param('id') id: string, @Body() userDto: CreateUserDto) {
        return this.userService.updateUserById(id, userDto)
    }

    @Delete(':id')
    @ApiResponse({status:200})
    @ApiOperation({ summary: 'Удаляет пользователя по id' })
    delete(@Param('id') id: string) {
        return this.userService.deleteUserById(id);
    }

}
