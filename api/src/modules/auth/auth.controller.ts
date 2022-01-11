import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto'

@Controller('Auth')
export class AuthController {
	constructor(private readonly service: AuthService) { }

	@Post()
	async login(@Body() authDto: AuthDto, @Res() response) {
		const { result, status } = await this.service.login(authDto)
		return response.status(status).json(result)
	}
}
