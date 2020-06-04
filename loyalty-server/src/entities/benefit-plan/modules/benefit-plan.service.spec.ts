import { Test, TestingModule } from '@nestjs/testing';
import { BenefitPlanService } from './benefit-plan.service';

describe('BenefitPlanService', () => {
  let service: BenefitPlanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BenefitPlanService],
    }).compile();

    service = module.get<BenefitPlanService>(BenefitPlanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
