import { Test, TestingModule } from '@nestjs/testing';
import { CaseController } from '../case.controller';
import { CaseService } from '../case.service';
import { UpdateCaseDto } from '../dto/update-case.dto';

describe('CaseController', () => {
  let caseController: CaseController;
  let spyService: CaseService;

  const mockCase = {
    _id: '001',
    text: 'Some case text',
  };

  const resultCase = {
    id: '001',
    text: 'Some case text',
    label: 'A64',
    timeToLabel: '14',
    doctorId: '123',
  };

  beforeEach(async () => {
    const serviceProvider = {
      provide: CaseService,
      useFactory: () => ({
        findToLabel: jest.fn(() => mockCase),
        editCase: jest.fn(() => resultCase),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CaseController],
      providers: [serviceProvider],
    }).compile();

    caseController = module.get<CaseController>(CaseController);
    spyService = module.get<CaseService>(CaseService);
  });

  describe('GET case', () => {
    it('should call findToLabel', async () => {
      caseController.findAllToLabel();
      expect(spyService.findToLabel).toHaveBeenCalled();
    });
  });

  describe('PUT update', () => {
    const caseId = '001';
    const updateCaseDto = new UpdateCaseDto();
    updateCaseDto.doctorId = '123';
    updateCaseDto.label = 'A64';
    updateCaseDto.timeToLabel = '14';

    it('should call editCase', async () => {
      caseController.update(caseId, updateCaseDto);
      expect(spyService.editCase).toHaveBeenCalled();
    });

    it('should label a case', async () => {
      caseController.update(caseId, updateCaseDto);
      const result = await spyService.editCase(caseId, updateCaseDto);
      const expectedLabeledCase = {
        id: '001',
        text: 'Some case text',
        label: 'A64',
        timeToLabel: '14',
        doctorId: '123',
      };
      expect(result).toEqual(expectedLabeledCase);
    });
  });
});
