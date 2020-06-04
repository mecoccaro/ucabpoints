import { Test, TestingModule } from '@nestjs/testing';
import { RolePrivilegeController } from './role-privilege.controller';

describe('RolePrivilege Controller', () => {
  let controller: RolePrivilegeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolePrivilegeController],
    }).compile();

    controller = module.get<RolePrivilegeController>(RolePrivilegeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
