import React, { createContext, useContext, useState, ReactNode } from "react";

interface SearchContextProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  pageIndex: number;
  setPageIndex: (index: number) => void;
  totalPages: number;
  setTotalPages: (pages: number) => void;
}

const SearchContext = createContext<SearchContextProps>({
  searchTerm: "",
  setSearchTerm: () => {},
  pageIndex: 0,
  setPageIndex: () => {},
  totalPages: 1,
  setTotalPages: () => {},
});

export const useSearchContext = () => useContext(SearchContext);

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        pageIndex,
        setPageIndex,
        totalPages,
        setTotalPages,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
