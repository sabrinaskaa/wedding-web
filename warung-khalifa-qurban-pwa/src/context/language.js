import React, { useState, createContext, useEffect } from "react";

export const LanguageContext = createContext();

const LanguageContextProvider = props => {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "id"
  );

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage
      }}
    >
      {props.children}
    </LanguageContext.Provider>
  );
};

export default LanguageContextProvider;
