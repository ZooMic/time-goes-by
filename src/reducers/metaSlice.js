import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    projects: {},
    nextProjectId: 0,
};

// ACTIONS

const addProject = (state, action) => {
    state.projects[state.nextProjectId] = {
        name: action.payload,
    };
    state.nextProjectId += 1;
};

const addAllMeta = (state, action) => {
    return action.payload || {};
};

const metaSlice = createSlice({
    name: 'meta',
    initialState,
    reducers: {
        addProject,
        addAllMeta,
    },
});

export default metaSlice.reducer;
export const { actions } = metaSlice;


// SELECTORS

export const selectProjects = state => state.meta.projects;