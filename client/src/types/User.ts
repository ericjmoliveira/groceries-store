import Order from './Order';

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  orders: Order[];
};

export default User;
