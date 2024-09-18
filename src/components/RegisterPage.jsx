import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';


const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  // const [recaptchaToken, setRecaptchaToken] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password}) //take out recaptcha token for now
      });
      if (response.ok) {
        navigate('/login');
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div 
    className="flex flex-col items-center justify-center min-h-screen relative"
    style={{
      backgroundImage: "url(/bsas2.webp)",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      width: '100vw',
      height: '100vh',
  }}
    >
      <div className='w-full max-w-sm bg-white p-6 rounded shadow-xl opacity-90'>
        <Link to='/' className='text-4xl mt-12 bg-transparent p-2 rounded absolute top-4 left-10 hover:text-gray-700'>Cello</Link>
        <h1 className="text-2xl mb-4">Register</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleRegister} className="">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 px-3 py-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 px-3 py-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 px-3 py-2 w-full rounded"
              required
            />
          </div>
{/* 
          <div className='w-full flex items-center justify-center mb-4'>
          
            <ReCAPTCHA
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY} // Add your reCAPTCHA site key here
              onChange={(token) => setRecaptchaToken(token)}
              onExpired={() => setRecaptchaToken(null)}
            
            />
          </div> */}

          <div className='w-full flex items-center justify-center mb-4'>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Register
            </button>
          </div>
          <span className=''>Already have an account? <Link to='/login' className='text-blue-600 hover:text-sky-500'>Login</Link> </span>
        
        </form>
      

      </div>
      
    </div>
  );
};

export default RegisterPage;