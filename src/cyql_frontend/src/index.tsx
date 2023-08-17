import React, { FC } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// state, redux-persist
import { Provider } from "react-redux";
import store, { persistor } from "@/state/_store";
import { PersistGate } from "redux-persist/integration/react";

// auth
import AuthProvider from "@/context/AuthContext";

const Index: FC = (): JSX.Element => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
};

const container = document.getElementById("app");
const root = createRoot(container!);
root.render(<Index />);