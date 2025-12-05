import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./users.service";
import { CreateNewUserIn } from "./Dtos/In/create.users";
import { CreateNewUserOut } from "./Dtos/Out/create.users";
import { FindUserOut} from "./Dtos/Out/find.user";
import { AuthGuard } from "src/Auth/auth.guard";
import { Roles } from "src/Auth/Role/role.decorator";
import { Role } from "src/Auth/Role/role.enum";
import { UpdateUserIn } from "./Dtos/In/update.user";
import { UpdateUserOut } from "./Dtos/Out/update.user";
import { deleteUserIn } from "./Dtos/In/delete.user";
import { getAllUsersOut } from "./Dtos/Out/get.users";
import { Public } from "src/Auth/public.decorator";

@Controller('users')
export class UserController {
    constructor(private readonly userService : UserService){}

    @Public()
    @Post()
    async createUser(@Body() newUser: CreateNewUserIn): Promise<CreateNewUserOut> {
        return await this.userService.createUser(newUser);
    }

    @UseGuards(AuthGuard)
    @Roles(Role.Admin)
    @Get(':id')
    async findOneUserById(@Param('id') idUser:string):Promise<FindUserOut> {
        return await this.userService.findOneUserById(idUser);
    }

    @UseGuards(AuthGuard)
    @Roles(Role.Admin)
    @Get()
    async getAllUsers():Promise<getAllUsersOut[]> {
        return await this.userService.getAllUsers();
    }

    @UseGuards(AuthGuard)
    @Roles(Role.Admin,Role.User)
    @Patch()
    async updateOneUserById(@Body() user: UpdateUserIn): Promise<UpdateUserOut>{
        return await this.userService.updateOneUserById(user)
    }

    @UseGuards(AuthGuard)
    @Roles(Role.Admin,Role.User)
    @Delete(':id')
    async deleteOneUserById(@Param() userId: deleteUserIn ): Promise<string>{
        return this.userService.deleteOneUserById(userId.id)
    }

}