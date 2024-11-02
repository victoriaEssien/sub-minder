import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"
import { auth, db } from "../../firebase_setup/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

  // Function to handle password visibility toggle
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Username validation
  const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    if (!usernameRegex.test(username)) {
      setUsernameError('Username can only contain alphanumeric characters');
      setTimeout(() => setUsernameError(''), 3000);
    } else {
      setUsernameError('');
    }
  };

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      setTimeout(() => setEmailError(''), 3000);
    } else {
      setEmailError('');
    }
  };

  // Password validation
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        'Please enter a valid password'
      );
      setTimeout(() => setPasswordError(''), 3000);
    } else {
      setPasswordError('');
    }
  };

  // Function to handle form submission
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate before submitting
    validateUsername(username);
    validateEmail(email);
    validatePassword(password);

    if (usernameError || emailError || passwordError || !username || !email || !password) {
      setLoading(false);
      return;
    }

    try {
      // Create user with email and password in firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create user document in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        userName: username,
        createdAt: new Date().toISOString(),
      });

      setLoading(false);
      setError('');

      // Display a success toast message
      toast.success('Sign up successful! Redirecting...', {
        // position: "top-right",
        // autoClose: 5000,
        // hideProgressBar: false,
        // closeOnClick: true,
        // pauseOnHover: true,
        // draggable: true,
        // progress: undefined,
      });


      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate('/login')
      }, 3000);

    } catch (error) {
      if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
        toast.error('This email address is already registered. Please log in instead.');
      } else {
        toast.error('An error occurred while trying to sign up. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }


  return (
    <section className='bg-hero h-screen'>
        <Navbar />
        <div className='mx-4 md:mx-12 pt-12'>
            <h1 className="font-montserrat text-4xl md:text-4xl text-center font-bold text-[#3E6B8E] leading-normal md:leading-loose ">Create a Sub-Minder account</h1>

            {/* Sign up form */}
            <div className="mt-8 mx-auto md:w-[400px]">
            <form className="w-full mx-auto" onSubmit={handleSignUp}>
                {/* Username Input */}
                <div>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} onBlur={() => validateUsername(username)} className="font-roboto mx-auto w-full md:w-full block rounded-lg border border-[#D1D1D1] px-4 py-3 text-base text-[#2d2d2d] placeholder:text-[#ccc] outline-[#3E6B8E] '" placeholder="Enter your username" />
                {usernameError && <p className='text-sm text-[#E34F4F] mt-1'>{usernameError}</p>}
                </div>

                {/* Email Input */}
                <div className="mt-4">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={() => validateEmail(email)} className="font-roboto mx-auto w-full md:w-full block rounded-lg border border-[#D1D1D1] px-4 py-3 text-base text-[#2d2d2d] placeholder:text-[#ccc] outline-[#3E6B8E] '" placeholder="Email address" />
                {emailError && <p className='text-sm text-[#E34F4F] mt-1'>{emailError}</p>}
                </div>

                {/* Password Input */}
                <div className='relative mt-4'>
                    <div className='flex items-center'>
                        <input type={showPassword ? 'text' : 'password'} name='password' id='password' className="font-roboto mx-auto w-full block rounded-lg border border-[#D1D1D1] px-4 py-3 text-base text-[#2d2d2d] placeholder:text-[#ccc] outline-[#3E6B8E] '" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} onBlur={() => validatePassword(password)} />
                        <button type='button' className='absolute text-base font-montserrat right-0 px-4 py-3' onClick={handlePasswordVisibility}>{showPassword ? <EyeIcon className="h-6 w-6 text-[#b3b3b3]" /> : <EyeSlashIcon className="h-6 w-6 text-[#b3b3b3]" />}</button>
                    </div>
                    {passwordError && <p className='text-sm text-[#E34F4F] mt-1'>{passwordError}</p>}
                    
                    <p className="font-roboto text-[#b3b3b3] text-sm w-full mt-2 leading-relaxed">Password must be at least 8 characters long and contain an uppercase letter, a lowercase letter, a number, and a special character.</p>
                </div>

                {/* Create Account Button */}
                <div className="mt-10 text-center">
                    <button type="submit" disabled={loading || usernameError || emailError || passwordError} className={`font-roboto text-[#2d2d2d] text-base bg-[#F5B400] hover:bg-[#E3A000] mx-auto w-full rounded-lg px-10 py-3.5 ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}>{loading ? 'Creating Account...' : 'Create Account'}</button>
                    <p className='my-8 text-base font-roboto text-[#2d2d2d]'>Already have an account?{' '} <span className='text-base font-roboto font-medium text-[#3E6B8E]'><Link to='/login'>Log in</Link></span></p>
                </div>
            </form>
            </div>
        </div>
        <ToastContainer />
    </section>
  )
}

export default SignUp