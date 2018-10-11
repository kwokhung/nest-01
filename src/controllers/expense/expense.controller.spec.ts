import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseController } from './expense.controller';

describe('Expense Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [ExpenseController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: ExpenseController = module.get<ExpenseController>(ExpenseController);
    expect(controller).toBeDefined();
  });
});
