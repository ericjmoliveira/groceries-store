import { createContext } from 'react';
import Order from '../../types/Order';

import User from '../../types/User';

interface AuthInterface {
  user: User | null;
  userOrders: Order[] | null;
  isLoadingUserData: boolean;
  requestedPurchase: boolean;
  signUp(firstName: string, lastName: string, email: string, password: string): void;
  signIn(email: string, password: string): void;
  signOut(): void;
  handleRequest(): void;
  createCheckoutSession(): void;
  updateEmail(newEmail: string, currentPassword: string): void;
  updatePassword(currentPassword: string, newPassword: string): void;
  deleteAccount(): void;
}

const AuthContext = createContext<AuthInterface>(null!);

export default AuthContext;
