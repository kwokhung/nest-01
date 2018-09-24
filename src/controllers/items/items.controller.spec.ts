import { Test, TestingModule } from '@nestjs/testing';
import { ItemsController } from './items.controller';

describe('Items Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [ItemsController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: ItemsController = module.get<ItemsController>(ItemsController);
    expect(controller).toBeDefined();
  });
});
