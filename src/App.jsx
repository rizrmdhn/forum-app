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
import DetailThreadPage from "./pages/DetailThreadPage";
import Loading from "./components/Loading";
import NewThreadPage from "./pages/NewThreadPage";

function App() {
  const { authUser = null, isPreload = false } = useSelector((state) => state);

  const dispatch = useDispatch();

  const [locale, setLocale] = useState("en");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) {
    return null;
  }

  return (
    <div className="App">
      <LocaleContext.Provider value={locale}>
        <ThemeContext.Provider value={theme}>
          <Headers authUser={authUser} />
          <Loading />
          <Routes>
            <Route path="/*" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/threads/:threadId" element={<DetailThreadPage />} />
            <Route path="/new" element={<NewThreadPage />} />
          </Routes>
        </ThemeContext.Provider>
      </LocaleContext.Provider>
    </div>
  );
}

export default App;
