import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['x-access-token'];

    if (!token) {
      return res
        .status(403)
        .json({ message: 'A token is required for authentication' });
    }

    jwt.verify(token, process.env.TOKEN_KEY, function (err, decoded) {
      if (err)
        return res
          .status(500)
          .json({ message: 'Failed to authenticate token.' });
    });

    next();
  }
}
