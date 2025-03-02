import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const session = req.session as { isAdmin?: boolean };

    if (session.isAdmin == undefined || session.isAdmin == false) {
      throw new BadRequestException("Vous n'êtes pas autorisé à ce chemin");
    }
    next();
  }
}
