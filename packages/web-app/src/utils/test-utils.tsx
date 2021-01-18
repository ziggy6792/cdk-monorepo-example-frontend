/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { Store } from '@reduxjs/toolkit';
import { createMemoryHistory } from 'history';
import initStore, { IRootState } from 'src/config/store';

type IRenderOptions = Omit<RenderOptions, 'queries'> & {
    initialState?: IRootState;
    store?: Store;
    route?: string;
    history?: any;
};

// eslint-disable-next-line import/prefer-default-export
export const renderWithAllProviders = (ui: React.ReactElement, customOptions: IRenderOptions = {}) => {
    const {
        initialState,
        store = initStore(initialState),
        route = '/',
        history = createMemoryHistory({ initialEntries: [route] }),
        ...renderOptions
    } = customOptions;

    const AllTheProviders: React.FC = ({ children }) => (
        <Provider store={store}>
            <Router history={history}>{children}</Router>
        </Provider>
    );

    return render(ui, { wrapper: AllTheProviders, ...renderOptions });
};
