import React, { useState } from 'react';
import GoogleIcon from '../images/google-icon.png';
import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signInWithPopup } from 'firebase/auth';
import { auth, googleAuthProvider } from '../firebase/setup';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const googleSignIn = async () => {
        try {
            await signInWithPopup(auth, googleAuthProvider);
        } catch (err) {
            console.error(err);
        }
    }

    const emailSignUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            onAuthStateChanged(auth, async (user: any) => {
                await sendEmailVerification(user);
            });
        } catch (err) {
            console.log(err);
        }
    }

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