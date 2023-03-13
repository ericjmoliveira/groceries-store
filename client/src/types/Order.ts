import Cart from './Cart';

type Order = {
  id: string;
  userId: string;
  cartData: Cart;
  orderedAt: string;
};

export default Order;
