import { Test, TestingModule } from '@nestjs/testing';
import { ConditionService } from '../condition.service';

class ConditionServiceMock {
  findAll() {
    return [
      {
        "ICD_10": "A64",
        "ICD_10_Description": "Unspecified sexually transmitted disease"
      }
    ]
  }
}

describe('ConditionService', () => {
  let service: ConditionService;

  beforeEach(async () => {
    const ServiceProvider = {
      provide: ConditionService,
      useClass: ConditionServiceMock,
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceProvider],
    }).compile();

    service = module.get<ConditionService>(ConditionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get all conditions', async () => {
    const expectedConditionICD_10 = "A64";
    const result = await service.findAll();
    expect(expectedConditionICD_10).toEqual(result[0]["ICD_10"]);
  });
});
