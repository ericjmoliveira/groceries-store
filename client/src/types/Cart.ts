import CartItem from './CartItem';

type Cart = {
  total: number;
  itemsQuantity: number;
  itemsOrdered: CartItem[];
};

export default Cart;
