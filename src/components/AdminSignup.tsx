import React, { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/setup';
import { Link, useNavigate } from 'react-router-dom';
import GoogleIcon from '../images/google-icon.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

const AdminSignup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState<string | null>(null);

    const adminData = { userEmail: email, userName: name, userPassword: password, userPhone: phone };

    const addAdminToThePortal = async () => {
        const response = await fetch('http://localhost:8090/api/users/register/admin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(adminData)
        })
        const data = await response.json();
        if (data.error != "") {
            toast.error(data.message);
        }
        else {
            toast.success(data.message);
        }
        console.log(data);
    }

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePassword = (password: string) => {
        return password.length >= 6;
    };

    const validatePhoneNumber = (phone: string) => {
        const phoneNumber = parsePhoneNumberFromString(phone, 'IN');
        return phoneNumber && phoneNumber.isValid();
    };

    const checkPhoneNumberExists = async (phone: string) => {
        // Simulate check since backend is not running
        // Replace this with actual backend API call
        // const response = await fetch('YOUR_BACKEND_API_ENDPOINT/checkPhoneNumber', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ phone })
        // });

        // const data = await response.json();
        // return data.exists;

        // For simulation purposes
        return false;
    };

    const emailSignUp = async () => {
        if (!name.trim()) {
            toast.error('Name is Required');
            return;
        }

        if (!validateEmail(email)) {
            toast.error('Invalid Email Format');
            return;
        }

        if (!validatePassword(password)) {
            toast.error('Password must be at least 6 characters long!');
            return;
        }

        if (!validatePhoneNumber(phone)) {
            toast.error('Invalid Phone Number');
            return;
        }

        try {
            const phoneExists = await checkPhoneNumberExists(phone);
            if (phoneExists) {
                toast.error('Phone Number is Already in Use!');
                return;
            }

            addAdminToThePortal();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            toast.success('Signed Up Successfully! Redirecting to Admin Login page.');

            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    console.log('Admin Signed Up Successfully:', user.uid);
                }
            });

            setTimeout(() => {
                navigate('/admin/login');
            }, 3000);
        }
        catch (err: any) {
            console.error(err);
            if (err.code === 'auth/email-already-in-use') {
                toast.error('Email Address is Already in Use!');
            } else if (err.code === 'auth/invalid-email') {
                toast.error('Invalid Email Format');
            } else {
                toast.error('Failed to Sign Up. Please try again later.');
            }
        }
    };

    const handleClose = () => {
        navigate('/partner-with-us');
    };

    return (
        <>
            <ToastContainer />
            <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-black bg-opacity-85 transition-opacity"></div>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-97 sm:max-w-lg">
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className='flex'>
                                    <h3 className="text-3xl font-semibold leading-6 text-gray-600" id="modal-title">Admin Sign Up</h3>
                                    <button
                                        onClick={handleClose}
                                        className="text-gray-500"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 ml-52"
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
                                {error && <div className="text-red-500 text-sm">{error}</div>}
                                <input onChange={(e) => setName(e.target.value)} className="mt-8 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Enter Name" required />
                                <input onChange={(e) => setEmail(e.target.value)} className="mt-5 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Enter Email" required />
                                <input type='password' onChange={(e) => setPassword(e.target.value)} className="mt-5 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Enter Password" required />
                                <input onChange={(e) => setPhone(e.target.value)} className="mt-5 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Enter Phone Number" required />
                                <button onClick={emailSignUp} className="mt-5 mb-3 bg-rose-500 w-full h-12 text-white py-2 px-4 rounded-lg">
                                    Create Account
                                </button>
                                <hr className='mt-4' />
                                <div className='text-base mt-5'>Already have an account? <Link to='/admin/login'><span className='text-red-500'>Log in</span></Link></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminSignup;