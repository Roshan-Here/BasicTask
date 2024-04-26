import { configureStore, combineReducers } from '@reduxjs/toolkit'
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import EmployedataReducer from "./Employee/setEmployeeSlice"

const rooteReducer = combineReducers({
    Edata: EmployedataReducer
})

const persistConfig = {
    key: "root",
    storage,
}

const persistedReducer = persistReducer(persistConfig, rooteReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
})

export const persistor = persistStore(store)