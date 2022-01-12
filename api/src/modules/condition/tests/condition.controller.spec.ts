import { Test, TestingModule } from '@nestjs/testing';
import { ConditionController } from '../condition.controller';
import { ConditionService } from '../condition.service';

describe('ConditionController', () => {
  let conditionController: ConditionController;
  let spyService: ConditionService;

  const condition = {
    "ICD_10": "A64",
    "ICD_10_Description": "Unspecified sexually transmitted disease"
  }

  beforeEach(async () => {
    const serviceProvider = {
      provide: ConditionService,
      useFactory: () => ({
        findAll: jest.fn(() => [condition]),
      }),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConditionController],
      providers: [serviceProvider],
    }).compile();

    conditionController = module.get<ConditionController>(ConditionController);
    spyService = module.get<ConditionService>(ConditionService);
  });

  describe('GET condition', () => {
    it('should call findAll conditions', async () => {
      conditionController.index();
      expect(spyService.findAll).toHaveBeenCalled();
    });

    it('should get all conditions', async () => {
      conditionController.index();
      const result = await spyService.findAll()
      expect(result.length).toEqual(1);
    });
  });
});
