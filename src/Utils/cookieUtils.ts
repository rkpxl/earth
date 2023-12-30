import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (name: string, value: string, options = {}): void => {
  cookies.set(name, value, options);
};

export const getCookie = (name: string): string | undefined => {
  return cookies.get(name);
};

export const removeAllCookie = () => {
  console.log('Removing all cookies');
  cookies.remove('name')
  cookies.remove('primartDepartment')
  cookies.remove('org')
  cookies.remove('orgId')
  cookies.remove('email')
  cookies.remove('exp')
  cookies.remove('_id')
  cookies.remove('type')
  cookies.remove('authToken')
}

