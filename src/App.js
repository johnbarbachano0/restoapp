import React from "react";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Theme from "./helpers/theme";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <Theme>
        <BrowserRouter>
          <Routes>
            <Route
              path="*"
              element={
                <p style={{ textAlign: "center" }}>
                  There's nothing here: 404!
                </p>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route exact path="/" element={<ProtectedRoute />}>
              <Route exact path="/" element={<Homepage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Theme>
    </Provider>
  );
}

export default App;
