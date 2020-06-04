import { Test, TestingModule } from '@nestjs/testing';
import { AmountController } from './amount.controller';

describe('Amount Controller', () => {
  let controller: AmountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AmountController],
    }).compile();

    controller = module.get<AmountController>(AmountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
