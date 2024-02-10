import { Body, Controller, Get, Param, Post, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminDTO } from "./admin.dto";



@Controller('/admin')
export class AdminController{
    constructor(private readonly adminService: AdminService){}
    @Get()
    getUsers(): object{
        return this.adminService.getUsers();
    }
    @Get('users/:id')
    getUsersById(@Param('id') id: string): object{
        return this.adminService.getUsersById(id);
    }

    @Get('users/')
    getUsersByNameAndId(@Query('name') name: string, 
    @Query('id') id:string) : object{
        return this.adminService.getUsersByNameAndId(name, id);
    }
    @Post('adduser')
    @UsePipes(new ValidationPipe)
    async addUser(@Body() myobj: AdminDTO): Promise<AdminDTO>{
        console.log(myobj.name);
        return this.adminService.addUser(myobj);
    }
}