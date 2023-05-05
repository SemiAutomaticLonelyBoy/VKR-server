import {Injectable} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {UsersService} from "../users/users.service";

@Injectable()
export class UserService {

    constructor(private userService: UsersService, private jwtService: JwtService) {
    }

    async verifyUser(headers: any) {
        const bearer = headers.authorization.split(' ')[0]
        const token = headers.authorization.split(' ')[1]
        const decoded = this.jwtService.verify(token, {secret: '123'})
        return this.userService.getUserByEmail(decoded.email);

    }

}
