
export function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    console.log(email);
    if (!emailRegex.test(email)) {
      throw new Error('Please enter a valid email address.');
      return
    }
  }
  
export function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        throw new Error('Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character.');
      }
}

export function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9]{3,15}$/;
    if (!usernameRegex.test(username)) {
        throw new Error('Invalid username. It must be 3-15 characters long and can only contain uppercase letters, lowercase letters, and numbers.');
    }
}

export function validatePasswordMatch(password, confirmPassword) {
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match.');
    }
  }
  
  export function clearErrorMessage(component) {
    component.errorMessage = '';
  }
  
  export function loadScript(src, callback) {
    let script = document.createElement('script');
    script.async = true;
    script.src = src;
    script.onload = () => callback();
    document.head.appendChild(script);
  }
  
