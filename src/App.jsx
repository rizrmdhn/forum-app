import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Headers from "./components/Headers";
import LocaleContext from "./contexts/LocaleContext";
import ThemeContext from "./contexts/ThemeContext";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import RegisterPage from "./pages/RegisterPage";
import { asyncPreloadProcess } from "./states/isPreload/action";
import { asyncUnsetAuthUser } from "./states/authUser/action";
import DetailThreadPage from "./pages/DetailThreadPage";

function App() {
  const { authUser = null, isPreload = false } = useSelector((state) => state);

  const dispatch = useDispatch();

  const [locale, setLocale] = useState("en");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return null;
  }

  return (
    <div className="App">
      <LocaleContext.Provider value={locale}>
        <ThemeContext.Provider value={theme}>
          <Headers authUser={authUser} />
          <Routes>
            <Route path="/*" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/threads/:threadId" element={<DetailThreadPage />} />
          </Routes>
        </ThemeContext.Provider>
      </LocaleContext.Provider>
    </div>
  );
}

export default App;
