import { expect, it, describe, beforeEach } from 'vitest'
import { screen, render, cleanup, queryByText, queryAllByRole } from '@testing-library/react'

import {renderWithProviders} from './test-utils'
import UserList from '../src/components/Dashboard/LeftColumn/UserList/UserList'
import {mockedStoreLogged} from './mocks'
import React from 'react'
import UserInfo from '../src/components/Dashboard/LeftColumn/UserInfo/UserInfo'


describe('UserList for Admins', () => {
  it('renders the UserList component for admins', () => {
    renderWithProviders(<UserList source='admins'/>, {preloadedState: mockedStoreLogged})
    const admin : HTMLElement = screen.getByText('admin');
    const me: HTMLElement = screen.getByText('me');
    expect(admin).toBeInTheDocument()
    expect(me).toBeInTheDocument()
  })

  it('renders the Active Admins with a green Icon', () => {
    renderWithProviders(<UserInfo user='admin' active={true} />, { preloadedState: mockedStoreLogged })
    const activeIcon: HTMLElement = screen.getByText('🟢')
    expect(activeIcon).toBeInTheDocument()
  })

  it('renders the non-active Admins without a green Icon', () => {
    renderWithProviders(<UserInfo user='me' active={false} />, { preloadedState: mockedStoreLogged })
    const me: HTMLElement = screen.getByText('me')
    expect(queryByText(me, '🟢')).toBeNull()
  })
})