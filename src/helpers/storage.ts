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
