import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchContext } from "@/contexts/SearchContext";
import styles from "./SubscriberList.module.css";

interface Subscriber {
  SubscriberId: string;
  Name: string;
  Email: string;
}

interface SubscriberResponse {
  subscribers: Subscriber[];
  pageIndex: number;
  pageSize: number;
  totalResults: number;
}

const SubscriberList: React.FC = () => {
  const { searchTerm, setSearchTerm, pageIndex, setPageIndex, setTotalPages } =
    useSearchContext();
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (searchTerm) {
        setLoading(true);
        setError("");
        try {
          const response = await axios.get<SubscriberResponse>(
            `https://tech-test.questline.com/searchsubscribers?pageIndex=${pageIndex}&search=${searchTerm}`
          );
          setSubscribers(response.data.subscribers);
          setTotalPages(
            Math.ceil(response.data.totalResults / response.data.pageSize)
          );
        } catch (error) {
          setError("Error fetching subscribers");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [searchTerm, pageIndex, setTotalPages]);

  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const pageIndexParam = searchParams.get("pageIndex");
    const searchTermParam = searchParams.get("search");

    if (pageIndexParam) {
      setPageIndex(parseInt(pageIndexParam));
    }
    if (searchTermParam) {
      setSearchTerm(searchTermParam);
    }
    setIsInitialLoad(false);
  }, []);

  useEffect(() => {
    if (!isInitialLoad) {
      const newSearchParams = new URLSearchParams();
      if (searchTerm) {
        newSearchParams.set("search", searchTerm);
      }
      newSearchParams.set("pageIndex", pageIndex.toString());
      window.history.pushState({}, "", `?${newSearchParams.toString()}`);
    }
  }, [searchTerm, pageIndex, isInitialLoad]);

  if (loading) {
    return <div className={styles.loadingText}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.errorMessage}>{error}</div>;
  }

  if (!loading && !error && searchTerm && subscribers.length === 0) {
    return (
      <div className={styles.noSubscribers}>
        No results. Try a different search.
      </div>
    );
  }

  return (
    <div className={styles.listContainer}>
      {subscribers.map((subscriber) => (
        <div key={subscriber.SubscriberId} className={styles.subscriberItem}>
          <div className={styles.Name}>{subscriber.Name}</div>
          <div className={styles.Email}>{subscriber.Email}</div>
          <div className={styles.SubscriberId}>
            <div>
              <svg
                width="16"
                height="14"
                viewBox="0 0 16 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.6875 7C4.70312 7 3.9375 6.23438 3.9375 5.25C3.9375 4.29297 4.70312 3.5 5.6875 3.5C6.64453 3.5 7.4375 4.29297 7.4375 5.25C7.4375 6.23438 6.64453 7 5.6875 7ZM12.6875 6.34375C13.043 6.34375 13.3438 6.64453 13.3438 7C13.3438 7.38281 13.043 7.65625 12.6875 7.65625H10.0625C9.67969 7.65625 9.40625 7.38281 9.40625 7C9.40625 6.64453 9.67969 6.34375 10.0625 6.34375H12.6875ZM6.5625 7.875C7.76562 7.875 8.75 8.85938 8.75 10.0625C8.75 10.3086 8.53125 10.5 8.3125 10.5H3.0625C2.81641 10.5 2.625 10.3086 2.625 10.0625C2.625 8.85938 3.58203 7.875 4.8125 7.875H6.5625ZM12.6875 4.15625C13.043 4.15625 13.3438 4.45703 13.3438 4.8125C13.3438 5.19531 13.043 5.46875 12.6875 5.46875H10.0625C9.67969 5.46875 9.40625 5.19531 9.40625 4.8125C9.40625 4.45703 9.67969 4.15625 10.0625 4.15625H12.6875ZM14 0.875C14.957 0.875 15.75 1.66797 15.75 2.625V11.375C15.75 12.3594 14.957 13.125 14 13.125H1.75C0.765625 13.125 0 12.3594 0 11.375V2.625C0 1.66797 0.765625 0.875 1.75 0.875H14ZM14.4375 11.375V2.625C14.4375 2.40625 14.2188 2.1875 14 2.1875H1.75C1.50391 2.1875 1.3125 2.40625 1.3125 2.625V11.375C1.3125 11.6211 1.50391 11.8125 1.75 11.8125H14C14.2188 11.8125 14.4375 11.6211 14.4375 11.375Z"
                  fill="#A3A3A3"
                />
              </svg>
            </div>
            <p>{subscriber.SubscriberId}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubscriberList;
