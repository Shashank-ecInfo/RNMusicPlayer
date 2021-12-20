import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";

// Imports: Redux
import rootReducer from "./reducers";

const middleware = [thunk];

// Middleware: Redux Persist Config
const persistConfig = {
  // Root
  key: "root",
  // Storage Method (React Native)
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  // whitelist: ["name of reducer"],
  // Blacklist (Don't Save Specific Reducers)
  blacklist: ["albumReducer"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(...middleware));

let persistor = persistStore(store);

export { store, persistor };
