import React, { useEffect } from "react";
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
import useInput from "./hooks/useInput";

function App() {
  const {
    authUser = null,
    isPreload = false,
    theme = "light",
    locale = "id",
  } = useSelector((state) => state);

  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useInput("");

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
          <Headers
            authUser={authUser}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <Loading />
          <Routes>
            {authUser !== null ? (
              <>
                <Route
                  path="/*"
                  element={<MainPage searchQuery={searchQuery} />}
                />
                <Route
                  path="/threads/:threadId"
                  element={<DetailThreadPage />}
                />
                <Route path="/new" element={<NewThreadPage />} />
              </>
            ) : (
              <>
                <Route
                  path="/*"
                  element={<MainPage searchQuery={searchQuery} />}
                />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                  path="/threads/:threadId"
                  element={<DetailThreadPage />}
                />
                <Route path="/new" element={<NewThreadPage />} />
              </>
            )}
          </Routes>
        </ThemeContext.Provider>
      </LocaleContext.Provider>
    </div>
  );
}

export default App;
