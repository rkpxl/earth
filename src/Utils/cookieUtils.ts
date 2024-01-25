import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (name: string, value: string, options = {}): void => {
  cookies.set(name, value, { path: '/' ,domain: '', ...options });
};

export const getCookie = (name: string): string | undefined => {
  return cookies.get(name);
};

export const removeAllCookie = () => {
  Object.keys(cookies.getAll()).forEach((cookieName) => {
    cookies.remove(cookieName, { path: '/' });
  });
  Object.keys(localStorage).forEach((key) => {
    localStorage.removeItem(key);
  });
};

// export const removeAllCookies = () => {
//   cookies.remove(undefined, { path: '/' });
// };

