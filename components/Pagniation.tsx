import styles from 'styles/Pagniation.module.scss';

interface Props {
    currentPage: number;
    productsPerPage: number;
    totalProducts: number;
    onPageChange: (pageNumber: number) => void;
  }
  
const Pagination = ({ currentPage, productsPerPage, totalProducts, onPageChange }: Props) => {
    var pageNumbers: number[] = [];
  
    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <div className={styles.pagination}>
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            className={pageNumber === currentPage ? styles.active : ''}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    );
  };
export default Pagination;