import { ManagerEntity } from "src/manager/manager.entity";
import {  BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity("admin")
export class AdminEntity{

    @PrimaryGeneratedColumn() 
    adminId: string;
  
    @Column({ type: 'varchar', length: 100, unique: true })
    email: string;
  
    @Column({name:'fulName', type: 'varchar', length: 150 })
    name: string;
    @Column()
    address: string;
    @Column()
    filename: string;

  
    @OneToMany(() => ManagerEntity, manager => manager.admin, { cascade: true })
    managers: ManagerEntity[];
    
}