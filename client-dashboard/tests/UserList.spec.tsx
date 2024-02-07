import { expect, it, describe, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'

import {renderWithProviders} from './test-utils'
import UserList from '../src/components/Dashboard/LeftColumn/UserList/UserList'
import { Provider } from 'react-redux'
import { store } from '../src/redux/store'
import {mockedStoreLogged} from './mocks'
import React from 'react'

describe('UserList for Admins', () => {
  beforeEach(() => {
    // render(
    //   <Provider store={store}>
    //     <UserList source = 'admins'/>
    //   </Provider>
    //   )
  })
  it('should be equal to 2', () => {
    expect(1 + 1).toEqual(2)
  })
  it('renders the UserList component for admins', () => {
    renderWithProviders(<UserList source='admins'/>, {preloadedState: mockedStoreLogged})
    expect(screen.getByText('testAdmin')).toBeInDocument()
    screen.debug(); // prints out the jsx in the App component unto the command line
  })
})