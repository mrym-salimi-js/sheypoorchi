import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import newAdReducer, { resetAd } from './newAdSlice';

const persistConfig = {
  key: 'newAd',
  storage,
};

const persistedNewAdReducer = persistReducer(persistConfig, newAdReducer);

const store = configureStore({
  reducer: {
    newAd: persistedNewAdReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

// Function to purge persisted state and reset Redux state
const clearPersistedState = () => {
  persistor.purge();
  store.dispatch(resetAd());
};

export { store, persistor, clearPersistedState };
