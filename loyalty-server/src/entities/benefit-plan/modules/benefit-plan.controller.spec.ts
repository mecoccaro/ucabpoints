import { Test, TestingModule } from '@nestjs/testing';
import { BenefitPlanController } from './benefit-plan.controller';

describe('BenefitPlan Controller', () => {
  let controller: BenefitPlanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BenefitPlanController],
    }).compile();

    controller = module.get<BenefitPlanController>(BenefitPlanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
