import Router from 'next/router';
import { create } from 'zustand';

import { getUser, signIn, signUp } from '@/services/api';
import { getToken, removeToken, setToken } from '@/helpers/storage';
import { Credentials, User } from '@/interfaces';

interface AuthStore {
  user: User | null;
  authenticated: boolean;
  handleAuthState(): Promise<void>;
  handleSignIn(credentials: Credentials): Promise<void>;
  handleSignUp(credentials: Credentials): Promise<void>;
  handleSignOut(): void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  authenticated: false,

  async handleAuthState() {
    const token = getToken();

    if (token) {
      const data = await getUser();

      if (data?.success) {
        set({ user: data.data?.user, authenticated: true });

        if (Router.pathname === '/signin' || Router.pathname === '/signup') {
          Router.push('/');
        }
      } else {
        removeToken();
      }
    }
  },

  async handleSignIn(credentials: Credentials) {
    const data = await signIn(credentials);

    if (data?.success) {
      set({ user: data.data?.user, authenticated: true });
      setToken(data.data?.token!);
      Router.push('/');
    } else {
      alert(data?.error);
    }
  },

  async handleSignUp(credentials: Credentials) {
    const data = await signUp(credentials);

    if (data?.success) {
      set({ user: data.data?.user, authenticated: true });
      setToken(data.data?.token!);
      Router.push('/');
    } else {
      alert(data?.error);
    }
  },

  handleSignOut() {
    removeToken();
    set({ user: null, authenticated: false });
    Router.push('/');
  }
}));
