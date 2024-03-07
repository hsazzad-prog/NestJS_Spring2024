import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './admin/auth/auth.module';


@Module({
  imports: [AdminModule, TypeOrmModule.forRoot(
    { type: 'postgres',
     host: 'localhost',
     port: 5432,
     username: 'postgres',
     password: 'root',
     database: 'secb',//Change to your database name
     autoLoadEntities: true,
     synchronize: true,
     } ), AuthModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}
