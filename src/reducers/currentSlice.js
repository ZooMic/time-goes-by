import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedProjectId: null,
    playerStatusId: 0,
    timeline: [],
    redoList: [],
};

// ### ACTIONS ###
const reset = (state) => {
    state.redoList = [];
    state.timeline = [];
    state.playerStatusId = 0;
};
const setProject = (state, action) => { state.selectedProjectId = action.payload };
const setPlayerStatus = (state, action) => { state.playerStatusId = action.payload };
const addTimelineEvent = (state, action) => {
    state.timeline.push({
        event: action.payload,
        timestamp: Date.now(),
    });

    state.redoList = [];
};
const undoEvent = (state) => {
    const last = state.timeline.pop();
    state.redoList.push(last);
}
const redoEvent = (state) => {
    const last = state.redoList.pop();
    state.timeline.push(last);
}

// ### SLICE / REDUCER ###
const slice = createSlice({
    name: 'current',
    initialState,
    reducers: {
        reset,
        setProject,
        setPlayerStatus,
        addTimelineEvent,
        undoEvent,
        redoEvent,
    },
});

export default slice.reducer;
export const { actions } = slice;

// export default () => {};

// ### SELECTORS ###
export const selectCurrent = state => state.current;
export const selectTimeline = state => state.current.timeline;
export const selectProjectId = state => state.current.selectedProjectId;