import { Model, ObjectId } from 'mongoose';
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface IUser {
  username: string;
  password: string;
  email: string;
  age: string;
  experience: string;
  bio?: string;
  location?: string;
}

export interface IAdmin {
  username: string;
  password: string;
  email: string;
  location: string;
}

interface IMessage {
  text: string;
  time: string;
  from: string;
}

export interface IConversation {
  id: string;
  users: string[];
  connectedUsers: string[];
  messages: IMessage[];
}

export interface IAlert {
  username: string;
  time: string;
  type: string;
  location: number[];
}

export interface INotification {
  type: string;
  text: string;
  time: string;
}

export interface ISocketControllerResponse {
  status: boolean;
  info: object | undefined;
}

export interface ILocation {
  name: string;
  coordinates: number[];
  alerts: IAlert[];
  notifications: INotification[];
  admins: string[];
  activeAdmins: string[];
}

export interface TypedJwt extends JwtPayload {
  _id: ObjectId;
}

export interface TypedRequest<Body> extends Request {
  user?: InstanceType<IUserModel | IAdminModel>;
  body: Body;
}

export type IUserModel = Model<IUser, {}, {}>;

export type IAdminModel = Model<IAdmin, {}, {}>;

export type ILocationModel = Model<ILocation, {}, {}>;

export type Alert = {
  location: string;
  userCoords: number[];
  helpType: string;
  username: string;
};
