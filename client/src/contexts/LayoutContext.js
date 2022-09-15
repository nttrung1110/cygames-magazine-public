import { createContext, useState } from "react";

export const LayoutContext = createContext();

const LayoutContextProvider = ({ children }) => {
  const [languageMenu, setLanguageMenu] = useState(false);
  const handleClickLanguageMenu = () => {
    setLanguageMenu(!languageMenu);
  };

  const [hamburgerMenu, setHamburgerMenu] = useState(false);
  const handleClickHamburgerMenu = () => {
    setHamburgerMenu(!hamburgerMenu);
  };

  const handleLinkChange = () => {
    setLanguageMenu(false);
    setHamburgerMenu(false);
    window.scrollTo(0, 0);
  };

  // category data

  const categoryData = [
    {
      categoryName: "COMPANY",
      categoryDes: "Know the company",
      pathName: "company",
    },
    {
      categoryName: "PEOPLE",
      categoryDes: "Know who works",
      pathName: "people",
    },
    {
      categoryName: "EVENT",
      categoryDes: "Event",
      pathName: "event",
    },
    {
      categoryName: "ALL",
      categoryDes: null,
      pathName: "all",
    },
  ];

  // format time
  const formatTime = (data) => {
    let formatTime = "";

    if (data) {
      formatTime =
        data.slice(0, 4) + "." + data.slice(5, 7) + "." + data.slice(8, 10);
    }

    return formatTime;
  };

  // Post context data
  const LayoutContextData = {
    languageMenu,
    setLanguageMenu,
    handleClickLanguageMenu,
    hamburgerMenu,
    setHamburgerMenu,
    handleClickHamburgerMenu,
    handleLinkChange,
    categoryData,
    formatTime,
  };

  // Return provider
  return (
    <LayoutContext.Provider value={LayoutContextData}>
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutContextProvider;
