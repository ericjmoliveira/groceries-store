import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import * as Styles from './styles';
import emptyCart from '../../images/empty-cart.svg';
import useAuth from '../../hooks/useAuth';
import Spinner from '../../components/Spinner/Spinner';
import useCart from '../../hooks/useCart';

const Success = () => {
  const auth = useAuth();
  const cart = useCart();

  useEffect(() => {
    cart?.clearCart();
  }, []);

  return (
    <Styles.Container>
      {auth.isLoadingUserData ? (
        <Styles.Loading>
          <Spinner />
        </Styles.Loading>
      ) : (
        <>
          <h2>Success</h2>
          <Styles.Status>
            <img src={emptyCart} alt="Empty cart" />
            <h3>Order sucessfully placed</h3>
            <p>Thank you for your purchase!</p>
            <Link to="/">Continue shopping</Link>
          </Styles.Status>
        </>
      )}
    </Styles.Container>
  );
};

export default Success;
