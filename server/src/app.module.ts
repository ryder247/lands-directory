import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { CoreModule } from './core/core.module';
import { LandFileModule } from './app/land-file/land-file.module';
import { MinuteFileModule } from './app/minute-file/minute-file.module';
import { OfficeHistoryModule } from './app/office-history/office-history.module';
import { ActivityLogModule } from './app/activity-log/activity-log.module';
import * as path from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      entities: [path.join(__dirname, '**/*.entity{.ts,.js}')],
    }),
    LandFileModule,
    MinuteFileModule,
    OfficeHistoryModule,
    ActivityLogModule,
    CoreModule,
  ],
})
export class AppModule {}
