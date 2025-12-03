import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./users.service";
import { CreateNewUserIn } from "./Dtos/In/create.users";
import { CreateNewUserOut } from "./Dtos/Out/create.users";
import { findUserOut } from "./Dtos/Out/find.user";
import { AuthGuard } from "src/Auth/auth.guard";
import { Roles } from "src/Auth/Role/role.decorator";
import { Role } from "src/Auth/Role/role.enum";

@Controller('users')
export class UserController {
    constructor(private readonly userService : UserService){}

    @Post()
    async createUser(@Body() newUser: CreateNewUserIn): Promise<CreateNewUserOut> {
        return await this.userService.createUser(newUser);
    }

    @UseGuards(AuthGuard)
    @Roles(Role.Admin)
    @Get(':id')
    async findOneUserById(@Param('id') idUser:string):Promise<findUserOut> {
        return await this.userService.findOneUserById(idUser);
    }
}