import Admin from '../models/Admin';
import User from './../models/User';
import { TypedSessionRequest } from '../types';
import { NextFunction } from 'express';
import { Response } from 'express';

const authMiddleware = async (req : TypedSessionRequest<any>, res : Response, next : NextFunction) => {
  try {
    const { uid } = req.session!;
    let user = await User.findOne({ _id: uid });
    if (!user) {
      user = await Admin.findOne({_id : uid});
      if (!user) {
        throw new Error()
      }
    }
    req.user = user;
    next();
  } catch (error) {
    return res.sendStatus(401);
  }
};

module.exports = authMiddleware;