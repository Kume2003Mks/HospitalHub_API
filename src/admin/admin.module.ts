import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { PromotionModule } from './promotion/promotion.module';
import { NewsModule } from './news/news.module';
import { HealthModule } from './health/health.module';
import { ImageModule } from './image/image.module';
import { DoctorModule } from './doctor/doctor.module';
import { DepartmentModule } from './department/department.module';
import { PageModule } from './page/page.module';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports: [PromotionModule, NewsModule, HealthModule, ImageModule, DoctorModule, DepartmentModule, PageModule],
})
export class AdminModule {}
