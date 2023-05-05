import {Body, Controller, Get, Headers} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UserService} from "./user.service";
import {User} from "../users/user.model";

@ApiTags('user')
@Controller('user')
export class UserController {

    constructor(private userService: UserService) {}

    @Get()
    @ApiResponse({status: 201, type: User})
    @ApiOperation({ summary: 'Получает текущего пользователя' })
    verify(@Headers() headers) {
        return this.userService.verifyUser(headers);
    }

}
