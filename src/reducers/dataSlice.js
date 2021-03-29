import { createSlice } from '@reduxjs/toolkit';
import { getCurrentDate } from '../helper/date';

/**
 * {
 *      '10-01-2020': {
 *          '1': [[event, timestamp], [event, timestamp]]
 *      }
 * }
 */
const initialState = {};

// ACTIONS

const saveCurrentSet = (state, action) => {
    const { selectedProjectId, timeline } = action.payload;
    console.log({ payload: action.payload });
    const date = getCurrentDate();

    if (selectedProjectId !== null) {
        if (!Object.keys(state).includes(date)) {
            state[date] = {};
        }
    
        if (!Object.keys(state[date]).includes(selectedProjectId)){
            state[date][selectedProjectId] = [];
        }
    
        state[date][selectedProjectId].push(timeline);
    }
};

const addAllData = (state, action) => {
    return action.payload || {};
};

const slice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        saveCurrentSet,
        addAllData,
    },
});

export default slice.reducer;
export const { actions } = slice;


// SELECTORS

export const selectDay = (date = getCurrentDate()) => state => {
    return state.data[date];
};