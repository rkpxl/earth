const  validateToken = () => {
  if(typeof localStorage === 'undefined') {
    return false
  }
  const exp = localStorage.getItem('exp');
  if (!exp) {
    return false
  }

  const currentTime = Math.floor(Date.now() / 1000);

  return currentTime < Number(exp);
}

function parseJwt(token : string) {
  if (!token) { return; }
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

export {
    validateToken,
    parseJwt
}