import { Link, useNavigate } from 'react-router-dom';
import slugify from 'slugify';

import useCart from '../../hooks/useCart';
import useAuth from '../../hooks/useAuth';
import * as Styles from './styles';
import emptyCart from '../../images/empty-cart.svg';

const Cart = () => {
  const cart = useCart();
  const auth = useAuth();
  const navigate = useNavigate();

  const handleOrder = () => {
    auth?.handleRequest();

    if (!auth?.user) navigate('/signin');
    else auth?.createCheckoutSession();
  };

  return cart?.cartData?.itemsQuantity === 0 ? (
    <Styles.Empty>
      <h2>Cart (0 items)</h2>
      <div>
        <h3>Time to start shopping!</h3>
        <p>Your cart is empty</p>
        <img src={emptyCart} alt="Empty cart" />
        <Link to="/">Shop now</Link>
      </div>
    </Styles.Empty>
  ) : (
    <Styles.Container>
      <Styles.Info>
        <div>
          <h2>
            Cart ({cart?.cartData?.itemsQuantity}
            {cart?.cartData?.itemsQuantity === 1 ? ' item' : ' items'})
          </h2>
          <Link to="/">See more products</Link>
        </div>
        <Styles.Confirm>
          <h2>Total: ${cart?.cartData?.total.toFixed(2)}</h2>
          <button disabled={auth.requestedPurchase} onClick={handleOrder}>
            Continue to checkout
          </button>
        </Styles.Confirm>
      </Styles.Info>
      <div>
        {cart?.cartData?.itemsOrdered.map((item) => (
          <Styles.Item key={item.id}>
            <Link to={`/product/${item.id}/${slugify(item.name!)}`}>
              <img src={item.thumbnail} alt={item.name} />
              <span>
                {item.name} <strong>(${item.price!.toFixed(2)}/ea)</strong>
              </span>
            </Link>
            <div>
              <strong>${item.subTotal!.toFixed(2)}</strong>
            </div>
            <div>
              <button onClick={() => cart.handleCart(item.id, false, true)}>Remove</button>
            </div>
            <Styles.Controller>
              <button
                onClick={() => {
                  cart.handleCart(item.id, false);
                }}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => {
                  cart.handleCart(item.id);
                }}
              >
                +
              </button>
            </Styles.Controller>
          </Styles.Item>
        ))}
      </div>
    </Styles.Container>
  );
};

export default Cart;
