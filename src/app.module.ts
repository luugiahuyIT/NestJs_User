import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import RoleGuard from './user/role.guard';
import { ConfigValidationSchema } from './config.schema';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: ConfigValidationSchema,
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mongodb',
    //   url: 'mongodb+srv://User:1234@cluster0.amrik.mongodb.net/nestjs_demo?retryWrites=true&w=majority',
    //   entities: [join(__dirname, '**/**.entity{.ts,.js}')],
    //   synchronize: true,
    //   useNewUrlParser: true,
    //   logging: true,
    // }),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('DB_DATABASE'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
