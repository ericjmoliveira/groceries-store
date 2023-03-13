import { Link } from 'react-router-dom';
import slugify from 'slugify';

import * as Styles from './styles';
import emptyCart from '../../images/empty-cart.svg';
import useAuth from '../../hooks/useAuth';
import Spinner from '../../components/Spinner/Spinner';

const Orders = () => {
  const auth = useAuth();
  const noOrders = auth?.userOrders?.length === 0 || !auth?.user;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];

    const day = date.getDate().toString().padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year}, ${hours}:${minutes}`;
  };

  return (
    <Styles.Container>
      {auth.isLoadingUserData ? (
        <Styles.Loading>
          <Spinner />
        </Styles.Loading>
      ) : (
        <>
          <h2>Orders List</h2>
          {noOrders ? (
            <Styles.Empty>
              <img src={emptyCart} alt="Empty cart" />
              <h3>No new orders</h3>
              <p>Check back after your next shopping trip!</p>
              <Link to="/">Shop now</Link>
            </Styles.Empty>
          ) : (
            <div>
              {auth?.userOrders?.map((order) => (
                <Styles.Order key={order.id}>
                  <p>
                    <strong>
                      Order ID: {order.id}
                      <br />
                      Order Date: {formatDate(order.orderedAt)}
                    </strong>
                  </p>
                  {order.cartData.itemsOrdered.map((item) => (
                    <Styles.Item key={item.id}>
                      <Link to={`/product/${item.id}/${slugify(item.name!).toLowerCase()}`}>
                        <img src={item.thumbnail} alt={item.name} />
                        <span>{item.quantity}</span>
                        <div>
                          <span>{item.name}</span>
                          <strong>(${(item.price! / 100).toFixed(2)}/ea)</strong>
                        </div>
                      </Link>
                      <span>
                        <strong>${(item.subTotal! / 100).toFixed(2)}</strong>
                      </span>
                    </Styles.Item>
                  ))}
                  <Styles.Total>
                    <h3>Total</h3>
                    <strong>${(order.cartData.total / 100).toFixed(2)}</strong>
                  </Styles.Total>
                </Styles.Order>
              ))}
            </div>
          )}
        </>
      )}
    </Styles.Container>
  );
};

export default Orders;
