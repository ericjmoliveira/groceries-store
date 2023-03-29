export interface Cart {
  totalPrice: number;
  totalItems: number;
  itemsList: Item[];
}

export interface Credentials {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface Item {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  quantity: number;
  subTotal: number;
}

export interface Product {
  id: string;
  category: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  image: string;
}

export interface Purchase {
  id: string;
  userId: string;
  data: Cart;
  purchasedAt: string;
}

export interface Response {
  success: boolean;
  data?: { user?: User; token?: string; products?: Product[]; url?: string };
  error?: string;
  message?: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  purchases: Purchase;
}
