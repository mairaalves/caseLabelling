import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth, AuthDocument } from './schemas/auth.schemas';
import { AuthDto } from './dto/auth.dto';

const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');

@Injectable()
export class AuthService {
	constructor(@InjectModel(Auth.name) private readonly model: Model<AuthDocument>) { }

	async login(authData: AuthDto): Promise<any> {		
		const user = await this.model.findOne({ email: authData.email }).exec();
		const encryptedPassword = CryptoJS.SHA256(authData.password).toString(CryptoJS.enc.Base64);

		if (user) {
			if (user.password == encryptedPassword){
				const token = jwt.sign(
					{ userId: user._id, email: user.email },
					process.env.TOKEN_KEY,
					{
						expiresIn: "2h",
					}
				);

				const success = { 
					status: 200, 
					result: { 
						message: 'Success', 
						token, 
						user: { name: user.name, id: user._id, email: user.email }
					}
				};

				return success
			}

			const invalidPassword = { status: 401, result: { message: 'Invalid password' } };
			return invalidPassword
		}

		return { status: 401, result: { message: 'User not found' } };
	}
}
