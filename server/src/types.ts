import { Model } from "mongoose"

export interface IUser {
  username: string,
  password: string,
  email: string,
  age: string,
  experience: string,
  bio?: string,
  location?: string
}

export interface IAdmin {
  username: string,
  password: string,
  email: string,
  location?: string
}

 interface IMessage {
  text: string,
  time: string,
  from: string
}

export interface IConversation {
  id: string,
  users: string[],
  connectedUsers: string[],
  messages: IMessage[]
}

  interface IAlert {
  text: string,
  time: string,
  type: string,
  location: number[]

}

export interface ILocation {
  name: string,
  coordinates: number[],
  alerts: IAlert[]
}


export type IUserModel = Model<IUser, {}, {}>

export type IAdminModel = Model<IAdmin, {}, {}>