import { useLayoutEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

import Home from '../pages/home';
import Product from '../pages/product';
import SignIn from '../pages/signin';
import SignUp from '../pages/signup';
import Cart from '../pages/cart';
import Account from '../pages/account';
import Orders from '../pages/orders';
import Search from '../pages/search';
import Success from '../pages/success';
import useAuth from '../hooks/useAuth';

// Handles the scroll to the top of the page when the route changes
const ScrollHandler = ({ children }: { children: JSX.Element }) => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [pathname]);

  return children;
};

const Authenticated = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();

  if (!auth?.user) return children;

  return <Navigate to="/account" />;
};

const AppRoutes = () => {
  return (
    <ScrollHandler>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/signin"
          element={
            <Authenticated>
              <SignIn />
            </Authenticated>
          }
        ></Route>
        <Route
          path="/signup"
          element={
            <Authenticated>
              <SignUp />
            </Authenticated>
          }
        ></Route>
        <Route path="/orders" element={<Orders />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/product/:id/:slug" element={<Product />}></Route>
        <Route path="/search/:query" element={<Search />}></Route>
        <Route path="/account" element={<Account />}></Route>
        <Route path="/success" element={<Success />}></Route>
      </Routes>
    </ScrollHandler>
  );
};

export default AppRoutes;
