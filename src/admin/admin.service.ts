import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AdminDTO, loginDTO } from "./admin.dto";
import { InjectRepository } from "@nestjs/typeorm";
import {  Repository } from "typeorm";
import { ManagerEntity } from "src/manager/manager.entity";
import { AdminEntity } from "./admin.entity";
import { JwtService } from '@nestjs/jwt';
import { emit } from "process";


@Injectable()
export class AdminService {
    constructor(@InjectRepository(AdminEntity)
  private adminRepo: Repository<AdminEntity>,
  @InjectRepository(ManagerEntity)
  private managerRepo: Repository<ManagerEntity>,
  private jwtService: JwtService

  ) { }
    getUsers(): object {
        return { message: "hellow Admin" }
    }
    getUsersById(id: string): object {
        return { message: "You id is " + id };
    }
    getUsersByNameAndId(name: string, id: string): object {
        return {
            message: "You id is " + name +
                " and your id is " + id
        };

    }
    async addAdmin(myobj: AdminEntity): Promise<AdminEntity> {
        return await this.adminRepo.save(myobj);
    }
    async getAllAdmins(): Promise<AdminEntity[]> {
        return this.adminRepo.find({ relations: ['managers'] });
    }

    async addManager(adminId: string, manager: ManagerEntity): Promise<ManagerEntity> {
        console.log(adminId);
        console.log(manager);
        const admin = await this.adminRepo.findOneBy({adminId: adminId});
         manager.admin = admin;
        return this.managerRepo.save(manager);
    }
    async findOne( logindata:loginDTO): Promise<any> {
        return await this.adminRepo.findOneBy({email:logindata.email});
      }


}
