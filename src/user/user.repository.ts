// // import {
// //   ConflictException,
// //   InternalServerErrorException,
// // } from '@nestjs/common';
// // // import { EntityRepository, MongoRepository, Repository } from 'typeorm';
// // import { SignUpInputDto } from './dto/signup-input.dto';
// // import { User } from './user.entity';
// // import * as bcrypt from 'bcrypt';
// // import { Role } from './role.enum';
// // import { ReturnModelType } from '@typegoose/typegoose';
// // import { AnyParamConstructor } from '@typegoose/typegoose/lib/types';
// // import * as uuid from 'uuid';

// // // @EntityRepository(User)
// // // export class UserRepository extends MongoRepository<User> {
// // //   async createUser(signUpInputDto: SignUpInputDto): Promise<void> {
// // //     const { username, password, lastName, firstName, email } = signUpInputDto;
// // //     // create salt and hash password
// // //     const salt = await bcrypt.genSalt();
// // //     const hashedPassword = await bcrypt.hash(password, salt);
// // //     const user = this.create({
// // //       username,
// // //       password: hashedPassword,
// // //       firstName,
// // //       email,
// // //       lastName,
// // //       role: Role.MEMBER,
// // //     });
// // //     try {
// // //       await this.save(user);
// // //     } catch (error) {
// // //       if (error.code === '23505') {
// // //         // code 23505 is error duplicate
// // //         throw new ConflictException('Username already exists');
// // //       } else {
// // //         throw new InternalServerErrorException();
// // //       }
// // //     }
// // //   }
// // // }
// // export type ModelType<User> = ReturnModelType<AnyParamConstructor<User>>;

// // export class UserRepository<User> {
// //   protected model: ModelType<User>;
// //   async createUser(signUpInputDto: SignUpInputDto): Promise<void> {
// //     const { username, password, lastName, firstName, email } = signUpInputDto;
// //     // create salt and hash password
// //     const salt = await bcrypt.genSalt();
// //     const hashedPassword = await bcrypt.hash(password, salt);
// //     const user = this.model.create({
// //       _id: uuid.v1(),
// //       username,
// //       password: hashedPassword,
// //       firstName,
// //       email,
// //       lastName,
// //       role: Role.MEMBER,
// //     });
// //     try {
// //       await this.model.updateOne(user);
// //     } catch (error) {
// //       if (error.code === '23505') {
// //         // code 23505 is error duplicate
// //         throw new ConflictException('Username already exists');
// //       } else {
// //         throw new InternalServerErrorException();
// //       }
// //     }
// //   }
// // }
// import { User } from './user.entity';
// import { EntityRepository, Repository } from 'typeorm';
// import { GetUserFilterDto } from './dto/get-user-filter.dto';
// import { Role } from './role.enum';
// import { InternalServerErrorException, Logger } from '@nestjs/common';
// // import { timeStamp } from 'console';
// @EntityRepository(User)
// export class UserRepository extends Repository<User> {
//   //   private logger = new Logger('TasksRepository');

//   async Search(filterDto: GetUserFilterDto): Promise<User[]> {
//     const { role, search } = filterDto;
//     const query = this.createQueryBuilder('user');

//     // if (status) {
//     //   query.andWhere('task.status = :status', { status });
//     // }
//     if (search) {
//       query.andWhere(
//         '(LOWER(user.firstName) LIKE LOWER(:search) OR LOWER(user.firstName) LIKE LOWER(:search) OR LOWER(user.username) LIKE LOWER(:search))',
//         { search: `%${search}%` },
//       );
//     }
//     try {
//       const tasks = await query.getMany();
//       return tasks;
//     } catch (error) {
//       //   this.logger.error(
//       //     `Failed to get tasks for user: "${
//       //       user.username
//       //     }". Filter: ${JSON.stringify({
//       //       filterDto,
//       //     })}`,
//       //     error.stack,
//       //   );
//       throw new InternalServerErrorException();
//     }
//   }

//   //   async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
//   //     const { title, description } = createTaskDto;
//   //     const task = this.create({
//   //       title,
//   //       description,
//   //       status: TaskStatus.OPEN,
//   //       user,
//   //     });
//   //     await this.save(task);
//   //     return task;
//   //   }
// }
