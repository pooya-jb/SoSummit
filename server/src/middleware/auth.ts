import Admin from '../models/Admin';
import User from './../models/User';
import { TypedJwt, TypedRequest } from '../types';
import { NextFunction } from 'express';
import { Response } from 'express';
import jwt from 'jsonwebtoken'
const SECRET_KEY = process.env.SECRET_KEY || 'lalala this isnt secure';

const authMiddleware = async (req: TypedRequest<any>, res: Response, next: NextFunction) => {
  const authHeaders = req.headers['authorization'];
  if (!authHeaders) return res.sendStatus(403);
  const token = authHeaders.split(' ')[1];
  try {
    const { _id } = jwt.verify(token, SECRET_KEY) as TypedJwt;
    let user = await User.findOne({ _id })
    if (user) {
      req.body = false;
    } else {
      user = await Admin.findOne({ _id });
      req.body = true;
    }
    if (!user) return res.sendStatus(401);
    req.user = user;
    next();
  } catch (error) {
    res.sendStatus(401);
  }
};

export default authMiddleware;