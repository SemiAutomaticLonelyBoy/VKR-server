import {Body, Controller, Post } from '@nestjs/common';
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {AuthService} from "./auth.service";
import {AuthUserDto} from "./dto/auth-user.dto";

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/login')
    @ApiOperation({ summary: 'Авторизация' })
    login(@Body() userDto: AuthUserDto) {
        return this.authService.login(userDto)
    }

    @Post('/registration')
    @ApiOperation({ summary: 'Регистрация' })
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto)
    }


}
