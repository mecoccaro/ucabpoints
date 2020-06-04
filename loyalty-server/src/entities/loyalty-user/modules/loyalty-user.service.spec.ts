import { Test, TestingModule } from '@nestjs/testing';
import { LoyaltyUserService } from './loyalty-user.service';

describe('LoyaltyUserService', () => {
  let service: LoyaltyUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoyaltyUserService],
    }).compile();

    service = module.get<LoyaltyUserService>(LoyaltyUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
