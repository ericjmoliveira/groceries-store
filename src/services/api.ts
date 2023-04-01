import axios from 'axios';

import { Cart, Credentials, Response } from '@/interfaces';
import { getToken } from '@/helpers/storage';

const api = axios.create({ baseURL: '/api' });
const token = getToken();

if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export async function getProducts() {
  try {
    const response = await api.get('/products');

    return response.data as Response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data as Response;
    }
  }
}

export async function getUser() {
  try {
    const response = await api.get('/users');

    return response.data as Response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data as Response;
    }
  }
}

export async function deleteUser() {
  try {
    const response = await api.delete('/users');

    return response.data as Response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data as Response;
    }
  }
}

export async function signIn(credentials: Credentials) {
  try {
    const response = await api.post('/auth/signin', credentials);

    return response.data as Response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data as Response;
    }
  }
}

export async function signUp(credentials: Credentials) {
  try {
    const response = await api.post('/auth/signup', credentials);

    return response.data as Response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data as Response;
    }
  }
}

export async function createCheckoutSession(itemsList: { id: string; quantity: number }[]) {
  try {
    const response = await api.post('/checkout', { itemsList });

    return response.data as Response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data as Response;
    }
  }
}
