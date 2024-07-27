import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromotionModule } from './promotion/promotion.module';
import { Promotion } from './entities/promotion.entity';
import { ContactModule } from './contact/contact.module';
import { Contact } from './entities/contact.entity';
import { Department } from './entities/department.entity';
import { NewsModule } from './news/news.module';
import { HealthModule } from './health/health.module';
import { Health } from './entities/health.entity';
import { News } from './entities/news.entity';
import { UserModule } from './user/user.module';
import { User } from './entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { AdminModule } from './admin/admin.module';
import { BannerModule } from './banner/banner.module';
import { Banner } from './entities/banner.entity';
import { DoctorModule } from './doctor/doctor.module';
import { Doctor } from './entities/doctor.entity';
import { PageModule } from './page/page.module';
import { Page } from './entities/page.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    MulterModule.register({
      dest: './upload',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'api_hospital',
      entities: [Promotion, Contact, Department, Health, News, User, Banner, Doctor, Page],
      synchronize: true,
    }), PromotionModule, ContactModule, NewsModule, HealthModule,
    UserModule, AuthModule, AdminModule, BannerModule, DoctorModule, PageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
