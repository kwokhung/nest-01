import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { ItemsController } from './controllers/items/items.controller';

@Module({
  imports: [],
  controllers: [AppController, CatsController, ItemsController],
  providers: [AppService],
})
export class AppModule {}
