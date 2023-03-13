import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import ProductsProvider from './contexts/products/ProductsProvider';
import AuthProvider from './contexts/authentication/AuthProvider';
import CartProvider from './contexts/cart/CartProvider';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ProductsProvider>
        <CartProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </CartProvider>
      </ProductsProvider>
    </BrowserRouter>
  </React.StrictMode>
);
