import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EmailInboxIcon from '../images/email-inbox-icon.png';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/setup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmailLogin = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const userEmailLogin = async () => {
        const response = await fetch('http://localhost:8090/api/users/login/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userEmail: email, userPassword: password })
        })
        const data = await response.json();
        console.log(data)
        if (data.error != "") {
            toast.error(data.message)
            return Error('Some Error Occurred!')
        }
        else {
            toast.success(data.message);
            localStorage.setItem('token', data.data.token)
            setTimeout(() => {
                navigate("/");
            }, 2000);
        }
    }

    const emailLogin = async () => {
        try {
            userEmailLogin();
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
        } catch (err: any) {
            console.error(err);
            toast.error(err.message || "An Unknown Error Occurred during Login");
        }
    }

    const handleClose = () => {
        navigate('/');
    };

    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <ToastContainer />
            <div className="fixed inset-0 bg-black bg-opacity-85 transition-opacity"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-96 sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className='flex'>
                                <h3 className="text-3xl font-semibold leading-6 text-gray-600" id="modal-title">Login</h3>
                                <button
                                    onClick={handleClose}
                                    className="text-gray-500"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 ml-60"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <img src={EmailInboxIcon} alt='Email Inbox Icon' className='w-24 h-24 mt-5 ml-28' />
                            <input onChange={(e) => setEmail(e.target.value)} className="outline-none border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Enter Email" required />
                            <input type='password' onChange={(e) => setPassword(e.target.value)} className="mt-5 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Enter Password" required />
                            <button onClick={emailLogin} className="mt-5 mb-3 bg-rose-500 w-full h-12 text-white py-2 px-4 rounded-lg">
                                Login with Email
                            </button>
                            {error && <div className="text-red-500 mt-2">{error}</div>}
                            <hr className='mt-4' />
                            <div className='text-base mt-5'>Already have an account? <Link to='/login'><span className='text-red-500'>Log in</span></Link></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmailLogin;