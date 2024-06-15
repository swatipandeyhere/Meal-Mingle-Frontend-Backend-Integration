export const isAuthenticated = (): boolean => {
    const signupGoogleSignIn = localStorage.getItem('signup_googleSignIn');
    const signupEmailSignUp = localStorage.getItem('signup_emailSignUp');
    const loginOtp = localStorage.getItem('login_otp');
    const loginGoogleSignIn = localStorage.getItem('login_googleSignIn');
    const emailLogin = localStorage.getItem('emailLogin');

    return !!(signupGoogleSignIn || signupEmailSignUp || loginOtp || loginGoogleSignIn || emailLogin);
};