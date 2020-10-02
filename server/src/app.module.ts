import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from './core/core.module';
import { LandFileModule } from './app/land-file/land-file.module';
import { MinuteFileModule } from './app/minute-file/minute-file.module';
import { OfficeHistoryModule } from './app/office-history/office-history.module';
import { ActivityLogModule } from './app/activity-log/activity-log.module';
import * as path from 'path';
import { UploadModule } from './app/upload/upload.module';
import { AppController } from './app.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      entities: [path.join(__dirname, '**/*.entity{.ts,.js}')],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../client'),
    }),
    LandFileModule,
    MinuteFileModule,
    OfficeHistoryModule,
    ActivityLogModule,
    CoreModule,
    UploadModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
