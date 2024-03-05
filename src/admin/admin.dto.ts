import { IsEmail, IsInt, IsString } from "class-validator";

export class AdminDTO{
    @IsString()
    name:string;
    password:number;
    @IsString()
    @IsEmail()
    email:string;
    address:string;
    filename:string;
}

export class AdminUpdateDTO{
    
}