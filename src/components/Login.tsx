import React, { useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import GoogleIcon from '../images/google-icon.png'
import EmailIcon from '../images/email-icon.png'
import { RecaptchaVerifier, signInWithPhoneNumber, signInWithPopup } from 'firebase/auth'
import { auth, googleAuthProvider } from '../firebase/setup'

const Login = () => {
    const [phone, setPhone] = useState("")
    const [user, setUser] = useState<any>(null);
    const [otp, setOtp] = useState("");

    const sendOtp = async () => {
        try {
            const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
            const confirmationResult = await signInWithPhoneNumber(auth, phone, recaptcha);
            setUser(confirmationResult);
        }
        catch (err) {
            console.error(err);
        }
    }

    const verifyOtp = async () => {
        try {
            await user.confirm(otp);
        }
        catch (err) {
            console.error(err);
        }
    }

    const googleSignIn = async () => {
        try {
            await signInWithPopup(auth, googleAuthProvider);
        }
        catch (err) {
            console.error(err);
        }
    }
    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

            <div className="fixed inset-0 bg-black bg-opacity-85 transition-opacity"></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-96 sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">

                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <h3 className="text-3xl font-semibold leading-6 text-gray-600" id="modal-title">Login</h3>
                                    <div className='mt-12 ml-2'>
                                        <PhoneInput
                                            country={'in'}
                                            value={phone}
                                            onChange={(phone) => setPhone("+" + phone)}
                                        />
                                    </div>
                                    <button onClick={sendOtp} className="mt-5 mb-3 bg-rose-500 w-80 h-12 text-white py-2 px-4 rounded">
                                        Send One Time Password
                                    </button>
                                    <div id="recaptcha"></div>
                                    {phone && <input onChange={(e) => setOtp(e.target.value)} className="mb-3 mt-3 outline-none border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2.5" placeholder="Enter OTP" required />}
                                    {otp && <button onClick={verifyOtp} className="mt-5 mb-3 bg-rose-500 w-80 h-12 text-white py-2 px-4 rounded">
                                        Verify One Time Password
                                    </button>}
                                    {!phone && <div>
                                        <div className='text-center mb-3'>or</div>
                                        <div className='flex items-center text-center border border-spacing-1 rounded-lg p-3'>
                                            <img src={EmailIcon} alt='Email Icon' className='w-7 h-7 ml-12' />
                                            <button className='ml-5'>Continue with Email</button>
                                        </div>
                                        <div onClick={googleSignIn} className='mt-5 flex items-center text-center border border-spacing-1 rounded-lg p-3'>
                                            <img src={GoogleIcon} alt='Google Icon' className='w-7 h-7 ml-12' />
                                            <button className='ml-5'>Continue with Google</button>
                                        </div>
                                    </div>}
                                    <hr className='mt-4' />
                                    <div className='text-base mt-5'>New to MealMingle? <span className='text-red-500'>Create Account</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login