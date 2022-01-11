import { BaseCaseDto } from "./base-case.dto";

export class UpdateCaseDto extends BaseCaseDto {
    doctorId: string;
    label: string;
    timeToLabel: string;
}