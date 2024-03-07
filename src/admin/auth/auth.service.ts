import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../admin.service';
import { AdminDTO, loginDTO } from 'src/admin/admin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService, 
    private jwtService: JwtService
  ) {}
  async signUp(myobj: AdminDTO): Promise<AdminDTO> {
    return await this.adminService.addAdmin(myobj);
}
  async signIn( logindata:loginDTO): Promise<{ access_token: string }> {
    const user = await this.adminService.findOne(logindata);
   if (!user) {
    throw new UnauthorizedException();
   }
    const isMatch = await bcrypt.compare(logindata.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = logindata;
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}