import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SignInInputDto } from './dto/signin-input.dto';
import { SignUpInputDto } from './dto/signup-input.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import JwtAuthenticationGuard from './auth/jwt-Authentication.guard';
import { Role } from './role.enum';
import RoleGuard from './auth/role.guard';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  singUp(@Body() signUpInputDto: SignUpInputDto): Promise<User> {
    return this.userService.signUp(signUpInputDto, Role.MEMBER);
  }

  @Post('/signin')
  singIn(
    @Body() SignInInputDto: SignInInputDto,
  ): Promise<{ accessToken: string }> {
    return this.userService.signIn(SignInInputDto);
  }

  @Post('/create')
  @UseGuards(RoleGuard(Role.ADMIN))
  @UseGuards(JwtAuthenticationGuard)
  createUser(@Body() signUpInputDto: SignUpInputDto): Promise<User> {
    return this.userService.createUser(signUpInputDto, signUpInputDto.roles);
  }

  @Get('/:id')
  @UseGuards(RoleGuard(Role.ADMIN))
  @UseGuards(JwtAuthenticationGuard)
  getUserById(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Patch('/:id/update')
  @UseGuards(RoleGuard(Role.ADMIN))
  @UseGuards(JwtAuthenticationGuard)
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete('/:id')
  @UseGuards(RoleGuard(Role.ADMIN))
  @UseGuards(JwtAuthenticationGuard)
  deleteUser(@Param('id') id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
