"use client";
import { SearchProvider } from "@/contexts/SearchContext";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import SubscriberList from "@/components/SubscriberList";

const Home: React.FC = () => {
  return (
    <SearchProvider>
      <SearchBar />
      <SubscriberList />
      <Pagination />
    </SearchProvider>
  );
};

export default Home;
