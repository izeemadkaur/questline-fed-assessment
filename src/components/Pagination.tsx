import styles from "./Pagination.module.css";
import { useSearchContext } from "../contexts/SearchContext";

const Pagination: React.FC = () => {
  const { searchTerm, pageIndex, setPageIndex, totalPages } =
    useSearchContext();

  const handlePageChange = (newPageIndex: number) => {
    setPageIndex(newPageIndex);
  };

  if (totalPages === 0 || !searchTerm) return null;

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.pageInfo}>
        Page {pageIndex + 1} of {totalPages}
      </div>
      <div>
        <button
          className={styles.pageButton}
          onClick={() => handlePageChange(pageIndex - 1)}
          disabled={pageIndex <= 0}
        >
          <svg
            width="9"
            height="14"
            viewBox="0 0 9 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.50781 13.9922C7.22656 13.9922 6.97656 13.8984 6.78906 13.7109L0.789062 7.71094C0.382812 7.33594 0.382812 6.67969 0.789062 6.30469L6.78906 0.304688C7.16406 -0.101562 7.82031 -0.101562 8.19531 0.304688C8.60156 0.679688 8.60156 1.33594 8.19531 1.71094L2.91406 6.99219L8.19531 12.3047C8.60156 12.6797 8.60156 13.3359 8.19531 13.7109C8.00781 13.8984 7.75781 13.9922 7.50781 13.9922Z"
              fill="white"
            />
          </svg>
        </button>

        <button
          className={styles.pageButton}
          onClick={() => handlePageChange(pageIndex + 1)}
          disabled={pageIndex >= totalPages - 1}
        >
          <svg
            width="9"
            height="14"
            viewBox="0 0 9 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.52344 13.9922C1.24219 13.9922 0.992188 13.8984 0.804688 13.7109C0.398438 13.3359 0.398438 12.6797 0.804688 12.3047L6.08594 6.99219L0.804688 1.71094C0.398438 1.33594 0.398438 0.679688 0.804688 0.304688C1.17969 -0.101562 1.83594 -0.101562 2.21094 0.304688L8.21094 6.30469C8.61719 6.67969 8.61719 7.33594 8.21094 7.71094L2.21094 13.7109C2.02344 13.8984 1.77344 13.9922 1.52344 13.9922Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
