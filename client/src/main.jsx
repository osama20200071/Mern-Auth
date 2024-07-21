import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import {
  HomePage,
  LoginPage,
  PrivateRoute,
  ProfilePage,
  SignUpPage,
} from "./pages";
import store from "./store/ReduxStore.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />} path="/">
      <Route element={<HomePage />} path="/" index />
      <Route element={<LoginPage />} path="/login" />
      <Route element={<SignUpPage />} path="/register" />
      <Route element={<PrivateRoute />}>
        <Route element={<ProfilePage />} path="/profile" />
      </Route>
      <Route element={<div>not found</div>} path="*" />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
