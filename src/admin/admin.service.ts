import { Injectable } from "@nestjs/common";
import { AdminDTO } from "./admin.dto";


@Injectable()
export class AdminService {

getUsers(): object{
    return {message: "hellow Admin"}
}
getUsersById(id: string): object{
return {message: "You id is " + id};
}
getUsersByNameAndId(name: string, id: string): object{
    return {message: "You id is " + name +
     " and your id is " + id};

}
async addUser(myobj:AdminDTO):Promise<AdminDTO>{
    console.log(myobj.name);
    return myobj;

}
}
