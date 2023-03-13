import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthContext from './AuthContext';
import User from '../../types/User';
import useApi from '../../hooks/useApi';
import useCart from '../../hooks/useCart';
import Order from '../../types/Order';

const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null);
  const [requestedPurchase, setRequestedPurchase] = useState(false);
  const [userOrders, setUserOrders] = useState<Order[] | null>(null);
  const [isLoadingUserData, setIsLoadingUserData] = useState(true);

  const api = useApi();
  const cart = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const retrieveLoggedUser = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        const data = await api.getUserData(token);

        if (!data.error) {
          setUser(data);
        } else localStorage.removeItem('token');
      }

      setIsLoadingUserData(false);
    };

    retrieveLoggedUser();
  }, []);

  useEffect(() => {
    setUserOrders(user?.orders!);
  }, [user]);

  const signUp = async (firstName: string, lastName: string, email: string, password: string) => {
    const data = await api.signUp(firstName, lastName, email, password);

    if (data.user) {
      setUser(data.user);
      localStorage.setItem('token', data.token);
      navigate('/');
    } else alert(data.error);
  };

  const signIn = async (email: string, password: string) => {
    const data = await api.signIn(email, password);

    if (data.user && data.token) {
      setUser(data.user);
      localStorage.setItem('token', data.token);

      if (requestedPurchase) navigate('/cart');
      else navigate('/');
    } else alert(data.error);
  };

  const createCheckoutSession = async () => {
    setRequestedPurchase(true);

    const itemsOrdered = cart?.cartData?.itemsOrdered.map((item) => {
      return {
        id: item.id,
        quantity: item.quantity
      };
    });

    if (itemsOrdered) {
      const token = localStorage.getItem('token');

      if (token) {
        const data = await api.createCheckoutSession(token, itemsOrdered);

        if (data.url) {
          window.location.href = data.url;
        } else {
          localStorage.removeItem('token');
          setUser(null);
          setUserOrders(null);
          navigate('/signin');
          alert(data.error);
        }
      }
    }
  };

  const handleRequest = () => setRequestedPurchase((prevState) => !prevState);

  const updateEmail = async (newEmail: string, currentPassword: string) => {
    const token = localStorage.getItem('token');

    if (token) {
      const data = await api.updateUserEmail(token, newEmail, currentPassword);
      if (data.error) return alert(data.error);
      else alert(data.message);
      signOut();
    }
  };

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    const token = localStorage.getItem('token');

    if (token) {
      const data = await api.updateUserPassword(token, currentPassword, newPassword);
      if (data.error) return alert(data.error);
      else alert(data.message);
      signOut();
    }
  };

  const deleteAccount = async () => {
    const token = localStorage.getItem('token');

    if (token) {
      await api.deleteUserAccount(token);
      signOut();
    }
  };

  const signOut = () => {
    navigate('/signin');
    setUser(null);
    setRequestedPurchase(false);
    setUserOrders(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userOrders,
        isLoadingUserData,
        requestedPurchase,
        signUp,
        signIn,
        signOut,
        handleRequest,
        createCheckoutSession,
        updateEmail,
        updatePassword,
        deleteAccount
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
