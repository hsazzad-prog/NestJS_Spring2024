import { IsEmail, IsInt, IsString } from "class-validator";

export class AdminDTO{
    @IsString()
    name:string;
    @IsInt()
    id:number;
    @IsString()
    @IsEmail()
    email:string;
    address:string;
}

export class AdminUpdateDTO{
    
}