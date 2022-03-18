import { Role } from './role.enum';
import * as uuid from 'uuid';
import mongoose from 'mongoose';
import { pre, prop } from '@typegoose/typegoose';
import { IsEnum } from 'class-validator';

export class User {
  @prop({ _id: uuid })
  _id: string;

  @prop({ required: true, unique: true })
  username: string;

  @prop({ required: true })
  password: string;

  @prop()
  firstName: string;

  @prop()
  lastName: string;

  @prop({ required: true })
  email: string;

  @prop({ enum: Role })
  roles: Role;

  // @pre<User>
  // async b4register() {
  //   this._id = await uuid.v1();
  // }
}
