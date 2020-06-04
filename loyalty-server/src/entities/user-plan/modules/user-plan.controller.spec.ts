import { Test, TestingModule } from '@nestjs/testing';
import { UserPlanController } from './user-plan.controller';

describe('UserPlan Controller', () => {
  let controller: UserPlanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserPlanController],
    }).compile();

    controller = module.get<UserPlanController>(UserPlanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
