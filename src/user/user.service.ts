import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignUpInputDto } from './dto/signup-input.dto';
import { User } from './user.entity';
import { Role } from './role.enum';
import { SignInInputDto } from './dto/signin-input.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './auth/jwt-payload-interface';
import { UpdateUserDto } from './dto/updateUser.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ReturnModelType } from '@typegoose/typegoose';
import * as uuid from 'uuid';

@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    @InjectModel('User')
    private userModel: ReturnModelType<typeof User>,
  ) {}

  async signUp(signUpInputDto: SignUpInputDto, role: Role): Promise<User> {
    const { username, password, lastName, firstName, email } = signUpInputDto;
    const existedUser = (await this.userModel.findOne({
      username,
    }))
      ? await this.userModel.findOne({
          username,
        })
      : await this.userModel.findOne({
          email,
        });
    if (existedUser) {
      throw new ConflictException('Username or Email already exists');
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    return await this.userModel.create({
      _id: await uuid.v1(),
      username,
      password: hashedPassword,
      email,
      lastName,
      firstName,
      roles: role,
    });
  }

  async signIn(
    signInInputDto: SignInInputDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = signInInputDto;
    const user = await this.userModel.findOne({ username });
    if (username && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  async createUser(signUpInputDto: SignUpInputDto, role: Role): Promise<User> {
    return this.signUp(signUpInputDto, role);
  }

  async getUserById(id: string): Promise<User> {
    const found = await this.userModel.findOne({
      _id: id,
    });

    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return found;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const { roles, email, lastName, firstName } = updateUserDto;
    return await this.userModel.findOneAndUpdate(
      { _id: id },
      { firstName, lastName, email, roles },
      { new: true },
    );
  }

  async deleteUser(id: string): Promise<void> {
    try {
      const result = await this.userModel.findByIdAndDelete({ _id: id });
    } catch {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }
}
