
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"
import { auth } from "../../firebase_setup/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../../components/Navbar";

function Login() {

    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  // Function to handle password visibility toggle
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
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

  // Generate a random token
  const generateAccessToken = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < characters.length; i++) {
      token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
  }

  // Function to handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate before submitting
    validateEmail(email);
    validatePassword(password);

    if (emailError || passwordError || !email || !password) {
      setLoading(false);
      return;
    }

    try {
      // sign in user with email and password in firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Generate access token and store it in a cookie with a 7-day expiration
      const accessToken = generateAccessToken();
      Cookies.set(import.meta.env.VITE_ACCESS_TOKEN_ID, accessToken, { expires: 7 });

      setLoading(false);
      setError('');

      // Display a success toast message
      toast.success('Login successful! Redirecting...', {
        // position: "top-right",
        // autoClose: 5000,
        // hideProgressBar: false,
        // closeOnClick: true,
        // pauseOnHover: true,
        // draggable: true,
        // progress: undefined,
      });
      
      // Redirect to discover page after a short delay
      setTimeout(() => {
        navigate('/dashboard')
      }, 3000);

    } catch (error) {
      if (error.message === 'Firebase: Error (auth/invalid-credential).') {
        toast.error('The email address or password you entered is incorrect. Please try again.');
      } else {
        toast.error('An error occurred while trying to login. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }


  return (
    <section className="bg-hero h-full">
        <Navbar />
        <div className="mx-4 md:mx-12 pt-12">
            <h1 className="font-montserrat text-3xl md:text-4xl text-center font-bold text-[#3E6B8E] leading-normal md:leading-loose ">Log in to your Sub-Minder account</h1>

            {/* Login form */}
            <div className="mt-8 mx-auto md:w-[400px]">
                <form className="w-full mx-auto" onSubmit={handleLogin}>
                    {/* Email Input */}
                    <div>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={() => validateEmail(email)} className="font-roboto mx-auto w-full md:w-full block rounded-lg border border-[#D1D1D1] px-4 py-3 text-base text-[#2d2d2d] placeholder:text-[#ccc] outline-[#3E6B8E] '" placeholder="Email address" />
                    {emailError && <p className='text-sm text-[#E34F4F] mt-1'>{emailError}</p>}
                    </div>

                    {/* Password Input */}
                    <div className='relative mt-4'>
                        <div className='flex items-center'>
                            <input type={showPassword ? 'text' : 'password'} name='password' id='password' className="font-roboto mx-auto w-full block rounded-lg border border-[#D1D1D1] px-4 py-3 text-base text-[#2d2d2d] placeholder:text-[#ccc] outline-[#3E6B8E] '" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} onBlur={() => validatePassword(password)} />
                            <button type='button' className='absolute text-base font-montserrat right-0 px-4 py-3' onClick={handlePasswordVisibility}>{showPassword ? <EyeIcon className="h-6 w-6 text-[#b3b3b3]" /> : <EyeSlashIcon className="h-6 w-6 text-[#b3b3b3]" />}</button>
                        </div>
                        {passwordError && <p className='text-sm font-roboto text-[#E34F4F] mt-1'>{passwordError}</p>}
                    </div>

                    {/* Login Button */}
                    <div className="mt-10 text-center">
                        <button type="submit" disabled={loading || emailError || passwordError} className={`font-roboto text-[#2D2D2D] text-base bg-[#F5B400] hover:bg-[#E3A000] mx-auto w-full rounded-lg px-10 py-3.5 ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}>{loading ? 'Logging In...' : 'Log In'}</button>
                        <p className='my-8 text-base font-roboto text-[#2d2d2d]'>Don&apos;t have an account?{' '} <span className='text-base font-roboto font-medium text-[#3E6B8E]'><Link to='/signup'>Sign up</Link></span></p>
                    </div>
                </form>
            </div>
        </div>
        <ToastContainer />
    </section>
  )
}

export default Login