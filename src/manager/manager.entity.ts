import { AdminEntity } from "src/admin/admin.entity";
import { BeforeInsert, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("manager")
export class ManagerEntity {
    @PrimaryGeneratedColumn()
    managerId: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    username: string;

    @Column({ type: 'varchar', length: 150 })
    fullName: string;

    @Column({ type: 'varchar', default: null })
    password: string;

  
    @ManyToOne(() => AdminEntity, admin => admin.managers)
    admin: AdminEntity;

}