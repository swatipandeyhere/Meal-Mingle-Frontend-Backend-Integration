import React, { useState } from 'react';
import GoogleIcon from '../images/google-icon.png';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/setup';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState<string | null>(null);

    const googleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, new GoogleAuthProvider());
            const user = result.user;
            const token = await user.getIdToken();

            localStorage.setItem('jwtToken', token);
        } catch (err) {
            console.error(err);
            setError((err as Error).message);
        }
    };

    const emailSignUp = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await sendEmailVerification(user);

            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    console.log('User signed up successfully:', user.uid);
                }
            });

           
            const response = await fetch('YOUR_BACKEND_API_ENDPOINT/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    phone
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to sign up');
            }

            const data = await response.json();
            const { token } = data;

            localStorage.setItem('jwtToken', token);

        } catch (err) {
            console.log(err);
            setError((err as Error).message);
        }
    };

    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-black bg-opacity-85 transition-opacity"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-96 sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className='flex'>
                                <h3 className="text-3xl font-semibold leading-6 text-gray-600" id="modal-title">Sign Up</h3>
                                <Link to='/'><div className='ml-52'>X</div></Link>
                            </div>
                            {error && <div className="text-red-500 text-sm">{error}</div>}
                            <input onChange={(e) => setName(e.target.value)} className="mt-8 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Enter Name" required />
                            <input onChange={(e) => setEmail(e.target.value)} className="mt-5 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Enter Email" required />
                            <input type='password' onChange={(e) => setPassword(e.target.value)} className="mt-5 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Enter Password" required />
                            <input onChange={(e) => setPhone(e.target.value)} className="mt-5 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Enter Phone Number" required />
                            <button onClick={emailSignUp} className="mt-5 mb-3 bg-rose-500 w-full h-12 text-white py-2 px-4 rounded-lg">
                                Create Account
                            </button>
                            <div className='text-center'>or</div>
                            <div onClick={googleSignIn} className='mt-3 flex items-center text-center border border-spacing-1 rounded-lg p-3'>
                                <img src={GoogleIcon} alt='Google Icon' className='w-7 h-7 ml-12' />
                                <button className='ml-5'>Sign in with Google</button>
                            </div>
                            <hr className='mt-4' />
                            <div className='text-base mt-5'>Already have an account? <Link to='/login'><span className='text-red-500'>Log in</span></Link></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;