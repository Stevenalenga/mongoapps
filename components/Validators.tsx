


const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };



const validatePassword = (password: string) => {
    if (password.includes(' ')) return false;
    if (!/[A-Z]/.test(password)) return false;
    if (!/[a-z]/.test(password)) return false;
    if (!/\d/.test(password)) return false;
    if (password.length < 8) return false;
    return true;
};

export { validateEmail, validatePassword };