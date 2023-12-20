import { useState, KeyboardEvent } from "react";
import styles from "./SearchBar.module.css";
import { useSearchContext } from "../contexts/SearchContext";

const SearchBar: React.FC = () => {
  const [searchTermInput, setSearchTermInput] = useState("");
  const { setSearchTerm, setPageIndex } = useSearchContext();
  const [error, setError] = useState("");

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTermInput(event.target.value);
  };

  const handleSearch = () => {
    if (searchTermInput.length >= 3) {
      setPageIndex(0);
    }
    setSearchTerm(searchTermInput);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (searchTermInput.length >= 3 || searchTermInput.length === 0) {
        setPageIndex(0);
        setSearchTerm(searchTermInput);
      }
      if (searchTermInput.length < 3 && searchTermInput.length > 0) {
        setError("Enter at least 3 characters");
      } else {
        setError("");
      }
    }
  };

  return (
    <div className={styles.searchContainer}>
      <h1>Search</h1>
      <p>Find subscribers by name, email address or Id.</p>
      <div className={styles.searchInputContainer}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search"
          value={searchTermInput}
          onChange={handleSearchInput}
          onKeyPress={handleKeyPress}
        />
        <button
          className={`${styles.searchButton} ${
            searchTermInput.length < 3 ? styles.searchButtonDisabled : ""
          }`}
          onClick={handleSearch}
          disabled={searchTermInput.length < 3}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.646 13.866C16.1148 14.366 16.1148 15.1473 15.646 15.6473C15.146 16.116 14.3648 16.116 13.8648 15.6473L10.146 11.8973C8.86478 12.741 7.30228 13.1785 5.61478 12.9598C2.73978 12.5535 0.42728 10.2098 0.0522799 7.366C-0.47897 3.116 3.11478 -0.477749 7.36478 0.0535006C10.2085 0.428501 12.5523 2.741 12.9585 5.616C13.1773 7.3035 12.7398 8.866 11.896 10.116L15.646 13.866ZM2.48978 6.491C2.48978 8.70975 4.27103 10.491 6.48978 10.491C8.67728 10.491 10.4898 8.70975 10.4898 6.491C10.4898 4.3035 8.67728 2.491 6.48978 2.491C4.27103 2.491 2.48978 4.3035 2.48978 6.491Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};

export default SearchBar;
