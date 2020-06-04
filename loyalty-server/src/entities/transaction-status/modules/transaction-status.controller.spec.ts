import { Test, TestingModule } from '@nestjs/testing';
import { TransactionStatusController } from './transaction-status.controller';

describe('TransactionStatus Controller', () => {
  let controller: TransactionStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionStatusController],
    }).compile();

    controller = module.get<TransactionStatusController>(TransactionStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
