import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LocationS, UserL } from '../types';
// loggedIn reducer not being used for now
const userMock: UserL[] = [{ username: 'greg', email: 'greg@mail', age: '12', experience: 'expert', bio: 'i am greg', location: 'botswana ski resort' }, { username: 'jack', email: 'greg@mail', age: '12', experience: 'expert', bio: 'i am greg', location: 'botswana ski resort' }]
const adminMock: UserL[] = [{ username: 'Bob', email: 'greg@mail', age: '12', experience: 'expert', bio: 'i am greg', location: 'botswana ski resort' }, { username: 'jack', email: 'greg@mail', age: '12', experience: 'expert', bio: 'i am greg', location: 'botswana ski resort' }]


const initialState : LocationS= {
  name: '',
  coordinates : [],
  alerts: [],
  users: userMock,
  admins: adminMock,
};

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    userEntered : (state : LocationS, action: PayloadAction<UserL>) => {
      return {
        ...state,
        users: [...state.users, action.payload]
      }
    },

    userLeft : (state : LocationS, action: PayloadAction<UserL>) => {
      return {
        ...state,
        users: state.users.filter(user => user.email !== action.payload.email)
      }
    },

    adminEntered : (state : LocationS, action: PayloadAction<UserL>) => {
      return {
        ...state,
        admins: [...state.admins, action.payload]
      }
    },

    adminLeft : (state : LocationS, action: PayloadAction<UserL>) => {
      return {
        ...state,
        admins: state.admins.filter(admin => admin.email !== action.payload.email)
      }
    },
  }
})

export default locationSlice.reducer;

export const {userEntered, userLeft, adminEntered, adminLeft} = locationSlice.actions;