/* eslint-disable react/button-has-type */
import { screen } from '@testing-library/react';
import React from 'react';
import { renderWithAllProviders } from 'src/utils/test-utils';
import ProfileScreen from './profile-screen';

describe('Profile Screen', () => {
  it('should show login form', async () => {
    renderWithAllProviders(<ProfileScreen />, { initialState: { auth: { isLoading: false, error: null, user: null }, tabs: {}, error: { isError: false } } });

    expect(await screen.findByText(/Sign in with Email/i)).toBeInTheDocument();
  });
});
