/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLocaleActionCreator } from "../../states/locale/action";

function LangButton() {
  const { locale = "id" } = useSelector((state) => state);

  const dispatch = useDispatch();

  const ChangeLanguage = (lang) => {
    dispatch(setLocaleActionCreator(lang));
    localStorage.setItem("locale", lang);
  };

  useEffect(() => {
    const localeStorage = localStorage.getItem("locale");
    if (localeStorage) {
      dispatch(setLocaleActionCreator(localeStorage));
    } else {
      dispatch(setLocaleActionCreator(locale));
    }
  }, [dispatch]);

  return (
    <button
      title="Change Language"
      className="changeLanguage-btn bi bi-translate"
      onClick={() => ChangeLanguage(locale === "id" ? "en" : "id")}
    ></button>
  );
}

export default LangButton;
