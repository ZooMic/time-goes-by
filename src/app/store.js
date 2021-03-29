import { configureStore } from '@reduxjs/toolkit';

import metaReducer from '../reducers/metaSlice';
import currentReducer from '../reducers/currentSlice';
import dataReducer from '../reducers/dataSlice';

console.log("REDUCERY", { dataReducer, currentReducer, metaReducer })

const store = configureStore({
  reducer: {
    meta: metaReducer,
    data: dataReducer,
    current: currentReducer,
  },
});

export default store;
export const { getState, dispatcher } = store; 
