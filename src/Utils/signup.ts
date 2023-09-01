const  validateToken = () => {

    const exp = localStorage.getItem('exp');
    if (!exp) {
      return false
    }

    const currentTime = Math.floor(Date.now() / 1000);

    return currentTime < Number(exp);
}

export {
    validateToken,
}