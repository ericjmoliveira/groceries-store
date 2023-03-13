import axios from 'axios';

import api from '../services/api';
import CartItem from '../types/CartItem';

export default function useApi() {
  return {
    async getProductsList() {
      try {
        const response = await api.get('/products');

        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return error.response?.data;
        }
      }
    },

    async signIn(email: string, password: string) {
      const credentials = { email, password };

      try {
        const response = await api.post('/auth/signin', credentials);

        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return error.response?.data;
        }
      }
    },

    async signUp(firstName: string, lastName: string, email: string, password: string) {
      const credentials = { firstName, lastName, email, password };

      try {
        const response = await api.post('/auth/signup', credentials);

        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return error.response?.data;
        }
      }
    },

    async getUserData(token: string) {
      try {
        const response = await api.get('/users', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return error.response?.data;
        }
      }
    },

    async createCheckoutSession(token: string, itemsOrdered: CartItem[]) {
      console.log(itemsOrdered);

      try {
        const response = await api.post(
          '/checkout',
          { itemsOrdered },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return error.response?.data;
        }
      }
    },

    async updateUserEmail(token: string, newEmail: string, currentPassword: string) {
      try {
        const response = await api.put(
          '/users',
          { newEmail, currentPassword },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return error.response?.data;
        }
      }
    },

    async updateUserPassword(token: string, currentPassword: string, newPassword: string) {
      try {
        const response = await api.put(
          '/users',
          { currentPassword, newPassword },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return error.response?.data;
        }
      }
    },

    async deleteUserAccount(token: string) {
      try {
        const response = await api.delete('/users', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return error.response?.data;
        }
      }
    }
  };
}
