import { configureStore } from "@reduxjs/toolkit";

import * as reducers from './exports'

export const reduxStore = configureStore({
    reducer: { ...reducers }
})



export type RootState = ReturnType<typeof reduxStore.getState>

export type AppDispatch = typeof reduxStore.dispatch

