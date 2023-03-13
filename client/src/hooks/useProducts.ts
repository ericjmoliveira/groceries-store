import { useContext } from 'react';

import ProductsContext from '../contexts/products/ProductsContext';

const useProducts = () => useContext(ProductsContext);

export default useProducts;
