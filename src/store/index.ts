import { configureStore }   from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';

import rootSaga             from './sagas/rootSaga';
import reducer              from './slices';


let sagaMiddleware = createSagaMiddleware();
const middleware   = [ sagaMiddleware ];

const store = configureStore({
  reducer: {
    index: reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(middleware),
});

sagaMiddleware.run(rootSaga);

export type RootState   = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store;