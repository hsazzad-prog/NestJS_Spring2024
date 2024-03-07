import { Optional } from "@nestjs/common";
import { IsEmail, IsInt, IsNotEmpty, IsString } from "class-validator";

export class AdminDTO{
   
    email: string;
    password: string;

    name: string;

    address: string;

    filename: string;

    @Optional()
    adminId: string;
    @Optional()
    managers: any;
}

export class loginDTO{
    @IsEmail() email: string;
    @IsNotEmpty() password: string;    
}