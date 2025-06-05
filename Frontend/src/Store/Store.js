import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice';
import blogReducer from './BlogSlice';
import saveblogsReducer from './SaveBlogs';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import { combineReducers } from 'redux';

const persistConfig = {
    key: 'root',
    storage,
    version: 1,

}


const rootReducer = combineReducers({
    user: userReducer,
    blog: blogReducer,
    saveblogs: saveblogsReducer
})


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export const persistor = persistStore(store);




export default store;