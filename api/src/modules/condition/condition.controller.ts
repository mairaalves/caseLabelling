import { Controller, Get } from '@nestjs/common';
import { ConditionService } from './condition.service';

@Controller('condition')
export class ConditionController {
    constructor(private readonly service: ConditionService) {}

    @Get()
    async index() {
        return await this.service.findAll();
    }
}
