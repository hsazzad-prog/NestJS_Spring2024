import { Body, Controller, Get, Param, Post, Query, Res, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminDTO } from "./admin.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import { ManagerEntity } from "src/manager/manager.entity";
import { AdminEntity } from "./admin.entity";



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

    @Post('addadmin')
    @UseInterceptors(FileInterceptor('myfile',
{ fileFilter: (req, file, cb) => {
  if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
   cb(null, true);
  else {
   cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
   }
  },
  limits: { fileSize: 30000 },
  storage:diskStorage({
  destination: './upload',
  filename: function (req, file, cb) {
   cb(null,Date.now()+file.originalname)
  },
  })
}
))
    @UsePipes(new ValidationPipe)
    async addUser(@Body() myobj: AdminDTO,  @UploadedFile()  myfile: Express.Multer.File): Promise<AdminDTO>{
       myobj.filename = myfile.filename;
        return this.adminService.addAdmin(myobj);
    }

    @Get('/getimage/:name')
    getImages(@Param('name') name:string, @Res() res) {
    res.sendFile(name,{ root: './upload' })
    }
    @Post('addmanager/:adminid')
    async addManager(@Param('adminid') adminid:string, @Body() myobj: ManagerEntity, ): Promise<ManagerEntity>{

         return this.adminService.addManager(adminid,myobj);
     }
     @Get('/getadmin')
     getAllAdmin() : Promise<AdminEntity[]> {
     return this.adminService.getAllAdmins();
     }

   
}