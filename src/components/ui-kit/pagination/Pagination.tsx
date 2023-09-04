import { useEffect, useMemo } from 'react';
import styles from './Pagination.module.scss';
import arrowLeftIcon from '../../../assets/icons/arrow-left.svg';
import doubleaArrowLeftIcon from '../../../assets/icons/double-arrow-left.svg';

const Pagination = ({
  total,
  itemsPerPage,
  currentPage,
  setCurrentPage
}: {
  total: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (value: number) => void;
}) => {
  useEffect(() => {
    setCurrentPage(1);
  }, [setCurrentPage, total]);

  // общее количество кнопок страниц
  const pages = useMemo(() => {
    const count = Math.ceil(total / itemsPerPage);
    return Array.from({ length: count }, (_, i) => i + 1);
  }, [itemsPerPage, total]);

  // количество кнопок страниц на странице которые видны
  const slicedPagesArray = useMemo(() => {
    if (currentPage <= 1) return pages.slice(0, 3);
    if (currentPage >= pages.length) return pages.slice(-3);

    const start = currentPage <= 2 ? 0 : currentPage - 2;
    const end =
      currentPage >= pages.length - 1 ? pages.length : currentPage + 1;

    return pages.slice(start, end);
  }, [currentPage, pages]);

  const leftArrowsDisabledClassname = useMemo(
    () => (currentPage === 1 ? styles._disabled : ''),
    [currentPage]
  );

  const rightArrowsDisabledClassname = useMemo(
    () => (currentPage === pages.length ? styles._disabled : ''),
    [currentPage, pages.length]
  );

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevFirstPage = () => {
    setCurrentPage(1);
  };

  const handleNextLastPage = () => {
    setCurrentPage(pages.length);
  };

  return (
    <div className={styles.wrapper}>
      {/* prev pages buttons */}
      <div
        className={`${styles.page} ${leftArrowsDisabledClassname}`}
        onClick={handlePrevFirstPage}
      >
        <img
          className={`${styles.image} ${leftArrowsDisabledClassname}`}
          src={doubleaArrowLeftIcon}
          alt=''
        />
      </div>
      <div
        className={`${styles.page} ${leftArrowsDisabledClassname} ${
          currentPage === 1 ? styles.prevBtn_disabled : ''
        }`}
        onClick={handlePrevPage}
      >
        <img
          className={`${styles.image} ${leftArrowsDisabledClassname}`}
          src={arrowLeftIcon}
          alt=''
        />
      </div>

      {/*  pages  */}
      {slicedPagesArray.map(item => (
        <div
          key={item}
          className={`${styles.page} ${
            currentPage === item ? styles.currentPage : ''
          }`}
          onClick={() => setCurrentPage(item)}
        >
          {item}
        </div>
      ))}

      {/* next pages buttons */}
      <div
        className={`${styles.page} ${rightArrowsDisabledClassname}`}
        onClick={handleNextPage}
      >
        <img
          className={`${styles.image} ${styles.rotateIcon} ${rightArrowsDisabledClassname}`}
          src={arrowLeftIcon}
          alt=''
        />
      </div>
      <div
        className={`${styles.page} ${rightArrowsDisabledClassname}`}
        onClick={handleNextLastPage}
      >
        <img
          className={`${styles.image} ${styles.rotateIcon} ${rightArrowsDisabledClassname}`}
          src={doubleaArrowLeftIcon}
          alt=''
        />
      </div>
    </div>
  );
};

export default Pagination;
