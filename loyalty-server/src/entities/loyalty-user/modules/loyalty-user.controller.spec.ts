import { Test, TestingModule } from '@nestjs/testing';
import { LoyaltyUserController } from './loyalty-user.controller';

describe('LoyaltyUser Controller', () => {
  let controller: LoyaltyUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoyaltyUserController],
    }).compile();

    controller = module.get<LoyaltyUserController>(LoyaltyUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
