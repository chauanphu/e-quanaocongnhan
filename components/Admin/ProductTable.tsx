import { useState } from "react";
import styles from 'styles/Admin/ProductTable.module.scss'
import Pagination from '../Pagniation';

const ProductTable = ({products, productsPerPage}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [category, setCategory] = useState('');
  
    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setCategory(event.target.value);
    };
  
    const handlePageChange = (pageNumber: number) => {
      setCurrentPage(pageNumber);
    };
  
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  
    return (
      <div className={styles.productTable}>
        <h1>Product Table</h1>
        <div className={styles.filters}>
          <label htmlFor="category">Filter by category:</label>
          <select id="category" value={category} onChange={handleCategoryChange}>
            <option value="">All</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="books">Books</option>
          </select>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <Pagination
          currentPage={currentPage}
          productsPerPage={productsPerPage}
          totalProducts={products.length}
          onPageChange={handlePageChange}
        /> */}
      </div>
    );
  };

export default ProductTable
  