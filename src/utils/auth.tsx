// utils/auth.ts
export function isAuthenticated(): boolean {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];
  
    return !!token;
  }
  