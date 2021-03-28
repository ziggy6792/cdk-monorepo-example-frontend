import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TabState = { [key in string]: string };

interface ITabAction {
    tabKey: string;
    tabValue: string;
}

export const tabsSlice = createSlice({
    name: 'tabs',
    initialState: {},
    reducers: {
        setTab: (state, action: PayloadAction<ITabAction>) => {
            state[action.payload.tabKey] = action.payload.tabValue;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setTab: setTabActionCreator } = tabsSlice.actions;

const tabsReducer = tabsSlice.reducer;

export default tabsReducer;
