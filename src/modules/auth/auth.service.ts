import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { _comparePassword, _hashPassword } from 'src/common/utils/bcrypt';
import { Role } from 'src/constants/role';
import { User } from 'src/modules/shared/decorators/user.decorator';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly _userService: UserService,
    private readonly _jwtService: JwtService,
  ) {}

  async signIn(@User() user: UserEntity): Promise<{ access_token: string }> {
    const payload = { id: user.id, email: user.email, role: user.role };
    return {
      access_token: await this._jwtService.signAsync(payload),
    };
  }

  async signUp(email: string, password: string, role: Role) {
    const user = await this._userService.findOneByEmail(email);
    if (user) throw new BadRequestException('User exists');

    password = await _hashPassword(password);

    return await this._userService.create({ email, password, role });
  }

  async validateUser(email: string, password: string) {
    const user = await this._userService.findOneByEmail(email);
    if (!user) throw new UnauthorizedException('User not found');

    const isMatch = await _comparePassword(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid password');

    return user;
  }
}
