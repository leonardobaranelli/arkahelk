import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ShipmentsModule } from './shipments/shipments.module';
import { ConnectorsModule } from './connectors/connectors.module';

@Module({
  imports: [UsersModule, ShipmentsModule, ConnectorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
