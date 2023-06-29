import { create } from 'zustand';
import { toast } from 'react-toastify';

import { getCart, removeCart, setCart } from '@/helpers/storage';
import { useProductsStore } from './products';
import { Cart } from '@/interfaces';

interface CartStore {
  data: Cart;
  populateCart(): void;
  handleCart(id: string, add: boolean, removeAll?: boolean): void;
  clearCart(): void;
}

const initialState = { totalPrice: 0, totalItems: 0, itemsList: [] };

export const useCartStore = create<CartStore>((set, get) => ({
  data: initialState,

  populateCart() {
    const cart = getCart();

    if (cart) {
      set({ data: cart });
    }
  },

  handleCart(id: string, add: boolean = true, removeAll: boolean = false) {
    if (get().data) {
      const newData = { ...get().data };

      const item = newData.itemsList.find((item) => item.id === id);

      if (add) {
        if (!item) {
          const newOrder = useProductsStore.getState().getProduct(id);

          if (newOrder) {
            newData.itemsList.push({
              id: newOrder.id,
              image: newOrder.image,
              name: newOrder.name,
              price: newOrder.price / 100,
              slug: newOrder.slug,
              quantity: 1,
              subtotal: newOrder.price / 100
            });

            newData.totalPrice += newOrder.price / 100;
          }

          toast(`Added ${newOrder?.name} to the cart`, {
            type: 'info',
            position: 'bottom-center',
            pauseOnHover: false,
            autoClose: 3000
          });
        } else {
          for (const item of newData.itemsList) {
            if (item.id === id) {
              item.quantity++;
              item.subtotal = item.quantity * item.price!;
              newData.totalPrice += item.price!;
            }
          }
        }

        newData.totalItems++;
      } else {
        for (const item of newData.itemsList) {
          if (item.id === id) {
            if (removeAll) {
              newData.totalItems -= item.quantity;
              newData.totalPrice -= item.price! * item.quantity;
              item.quantity = 0;
            } else {
              newData.totalItems--;
              item.quantity--;
              item.subtotal = item.quantity * item.price!;
              newData.totalPrice -= item.price!;
            }

            if (newData.totalItems <= 0) newData.totalPrice = 0.0;

            if (item.quantity === 0) {
              newData.itemsList = newData.itemsList.filter((item) => item.id !== id);

              toast(`Removed ${item.name} from the cart`, {
                type: 'info',
                position: 'bottom-center',
                pauseOnHover: false,
                autoClose: 3000
              });
            }
          }
        }
      }

      set({ data: newData });
      setCart(newData);
    }
  },

  clearCart() {
    removeCart();
    set({ data: initialState });
    toast('Removed all items from the cart', {
      type: 'info',
      position: 'bottom-center',
      pauseOnHover: false,
      autoClose: 3000
    });
  }
}));
