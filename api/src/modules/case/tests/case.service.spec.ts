import { Test, TestingModule } from '@nestjs/testing';
import { CaseService } from '../case.service';
import { UpdateCaseDto } from '../dto/update-case.dto'

class CaseServiceMock {
  findToLabel() {
    return {
      "_id": "001",
      "text": "Some case text"
    }
  }

  editCase() {
    return {
      "id": "001",
      "text": "Some case text",
      "label": "A64",
      "timeToLabel": "14",
      "doctorId": "123"
    }
  }
}

describe('CaseService', () => {
  let service: CaseService;

  beforeEach(async () => {
    const ServiceProvider = {
      provide: CaseService,
      useClass: CaseServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceProvider],
    }).compile();

    service = module.get<CaseService>(CaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get a case', async () => {
    const caseText = "Some case text";
    const result = await service.findToLabel();
    expect(caseText).toEqual(result["text"]);
  });

  it('should label a case', async () => {
    const caseId = "001";

    const updateCaseDto = new UpdateCaseDto();
    updateCaseDto.doctorId = "123";
    updateCaseDto.label = "A64";
    updateCaseDto.timeToLabel = "14";

    const expectedResult = {
      "doctorId": "123",
      "id": "001",
      "label": "A64",
      "timeToLabel": "14",
      "text": "Some case text"
    }

    const result = await service.editCase(caseId, updateCaseDto);
    expect(result).toEqual(expectedResult);
  });
});
