import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../config/config.module';
import { DatabaseConfigService } from './databaseConfig.service';

@Module({
    imports: [
        ConfigModule,
        MongooseModule.forRootAsync({
            useClass: DatabaseConfigService
        })
    ]
})
export class DatabaseModule {}
