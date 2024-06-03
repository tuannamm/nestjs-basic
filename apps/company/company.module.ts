import { Module } from '@nestjs/common';
import { CompanyController } from './presentation/company.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { CompanyEntity, CompanySchema } from './entities/company.entity';

import { CreateCompanyHandler } from './application/handlers/create-company.handler';
import { UpdateCompanyHandler } from './application/handlers/update-company.handler';
import { DeleteCompanyHandler } from './application/handlers/delete-company.handler';

const handlers = [CreateCompanyHandler, UpdateCompanyHandler, DeleteCompanyHandler];

const repositories = [
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      uri: configService.get<string>('MONGO_DB_URI')
    }),
    inject: [ConfigService]
  }),
  MongooseModule.forFeature([{ name: CompanyEntity.name, schema: CompanySchema }])
];
@Module({
  imports: [CqrsModule, ...repositories],
  controllers: [CompanyController],
  providers: [...handlers]
})
export class CompanyModule {}
