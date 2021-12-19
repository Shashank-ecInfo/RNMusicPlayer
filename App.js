import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

import AppStack from "./navigation/Navigation";
import React from "react";

// Imports: Redux Persist Persister
import { store, persistor } from "./store/store";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <NativeBaseProvider>
            <AppStack />
          </NativeBaseProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
