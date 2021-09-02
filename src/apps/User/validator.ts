import { validateOrReject } from 'class-validator'
import { Request, Response, NextFunction } from 'express'
import { plainToClass } from 'class-transformer'
import { User } from './User.entity'

export const validateUser = async (req: Request, _: Response, next: NextFunction) => {

  const transformed = plainToClass(User, req.body);
  await validateOrReject(transformed);

  return next();

}