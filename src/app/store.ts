import { configureStore } from '@reduxjs/toolkit'
import type { Action, ThunkAction } from '@reduxjs/toolkit'
import mainInputReducer from '../features/input/mainInputSlice'

export const store = configureStore({
  reducer: {
    mainInput: mainInputReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
