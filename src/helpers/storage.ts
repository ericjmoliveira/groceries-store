import { Cart } from '@/interfaces';

export function getToken() {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');

    return token || null;
  }
}

export function setToken(token: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
}

export function removeToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
}

export function getCart() {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('cart');

    if (!data) {
      return null;
    }

    const cart = JSON.parse(data) as Cart;

    return cart;
  }
}

export function setCart(cart: Cart) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}

export function removeCart() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('cart');
  }
}
