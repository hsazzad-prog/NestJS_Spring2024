import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminEntity } from "./admin.entity";
import { ManagerEntity } from "src/manager/manager.entity";
import { JwtModule } from "@nestjs/jwt/dist/jwt.module";
import { AuthService } from "./auth/auth.service";

@Module({
    imports: [TypeOrmModule.forFeature([AdminEntity, ManagerEntity]),
    JwtModule.register({
      global: true,
      secret: "3NP_Backend_Admin",
      signOptions: { expiresIn: '30m' },
    }),
  ],
    controllers: [AdminController],
    providers: [AdminService,AuthService],
    exports: [AdminService],
  })
  export class AdminModule {}
  