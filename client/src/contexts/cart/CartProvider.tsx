import { useEffect, useState } from 'react';

import CartContext from './CartContext';
import Cart from '../../types/Cart';
import useProducts from '../../hooks/useProducts';

const CartProvider = ({ children }: { children: JSX.Element }) => {
  const initialState = { total: 0.0, itemsQuantity: 0, itemsOrdered: [] };
  const [cartData, setCartData] = useState<Cart | null>(initialState);
  const [categoryClicked, setCategoryClicked] = useState('');

  const { getProduct } = useProducts();

  useEffect(() => {
    const cartData = localStorage.getItem('cartData');

    if (cartData) setCartData(JSON.parse(cartData));
  }, []);

  const handleCart = (productId: string, add: boolean = true, removeAll: boolean = false) => {
    if (cartData) {
      const newCartData = { ...cartData };

      const item = newCartData.itemsOrdered.find((item) => item.id === productId);

      if (add) {
        if (!item) {
          const newOrder = getProduct(productId);

          if (newOrder) {
            newCartData.itemsOrdered.push({
              id: newOrder.id,
              thumbnail: newOrder.thumbnail,
              name: newOrder.name,
              price: newOrder.price / 100,
              quantity: 1,
              subTotal: newOrder.price / 100
            });

            newCartData.total += newOrder.price / 100;
          }
        } else {
          for (const item of newCartData.itemsOrdered) {
            if (item.id === productId) {
              item.quantity++;
              item.subTotal = item.quantity * item.price!;
              newCartData.total += item.price!;
            }
          }
        }

        newCartData.itemsQuantity++;
      } else {
        for (const item of newCartData.itemsOrdered) {
          if (item.id === productId) {
            if (removeAll) {
              newCartData.itemsQuantity -= item.quantity;
              newCartData.total -= item.price! * item.quantity;
              item.quantity = 0;
            } else {
              newCartData.itemsQuantity--;
              item.quantity--;
              item.subTotal = item.quantity * item.price!;
              newCartData.total -= item.price!;
            }

            if (newCartData.itemsQuantity <= 0) newCartData.total = 0.0;

            if (item.quantity === 0) {
              newCartData.itemsOrdered = newCartData.itemsOrdered.filter(
                (item) => item.id !== productId
              );
            }
          }
        }
      }

      setCartData(newCartData);
      localStorage.setItem('cartData', JSON.stringify(newCartData));
    }
  };

  const handleCategoryClicked = (categoryId: string) => setCategoryClicked(categoryId);

  const clearCart = () => {
    localStorage.removeItem('cartData');
    setCartData(initialState);
  };

  return (
    <CartContext.Provider
      value={{ cartData, categoryClicked, handleCategoryClicked, handleCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
