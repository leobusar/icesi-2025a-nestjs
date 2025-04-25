import { Controller, Get, Post, Body, UseGuards, SetMetadata, Request, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleProtected } from './decorators/role-protected.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto){
    return this.authService.createUser(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto){
    return this.authService.loginUser(loginUserDto);
  }

  @Get('protected')
  @UseGuards(AuthGuard())
  protected1(){
    return 'esto es una ruta protegida';
  }

  @Get('protected2')
  @SetMetadata('roles', ['admin','superadmin'])
  //@RoleProtected('admin', 'superadmin')
  protected2(@Req() req){
    console.log(req);
  }
}
