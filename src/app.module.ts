import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { ItemsController } from './controllers/items/items.controller';
import { ExpenseController } from './controllers/expense/expense.controller';

@Module({
  imports: [],
  controllers: [AppController, CatsController, ItemsController, ExpenseController],
  providers: [AppService],
})
export class AppModule {}
