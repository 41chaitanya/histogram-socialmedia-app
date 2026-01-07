import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import PasswordInput from '../components/PasswordInput';
import gsap from 'gsap';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  
  const formRef = useRef();
  const logoRef = useRef();
  const inputRefs = useRef([]);

  // Check if passwords match
  const passwordsMatch = password === confirmPassword && password !== '';
  
  // Check if form is valid
  const isFormValid = username && password.length >= 6 && passwordsMatch;

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(logoRef.current,
      { y: -50, opacity: 0, rotateX: 90 },
      { y: 0, opacity: 1, rotateX: 0, duration: 0.8, ease: 'power3.out' }
    )
    .fromTo(formRef.current,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' },
      '-=0.4'
    )
    .fromTo(inputRefs.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'power2.out' },
      '-=0.3'
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!passwordsMatch) {
      setError('Passwords do not match');
      gsap.to(formRef.current, {
        x: [-10, 10, -10, 10, 0],
        duration: 0.4
      });
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    gsap.to(e.target.querySelector('button[type="submit"]'), {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1
    });

    try {
      await api.register(username, password);
      
      gsap.to(formRef.current, {
        scale: 1.05,
        boxShadow: '0 0 30px rgba(225, 48, 108, 0.5)',
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          setSuccess('Registration successful! Redirecting to login...');
          setTimeout(() => navigate('/login'), 1500);
        }
      });
    } catch (err) {
      setError(err.message || 'Registration failed. Username may already exist.');
      gsap.to(formRef.current, {
        x: [-10, 10, -10, 10, 0],
        duration: 0.4
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card" ref={formRef}>
        <div className="logo" ref={logoRef}>
          <h1>Histogram</h1>
          <p className="tagline">Sign up to see photos and videos from your friends.</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group" ref={el => inputRefs.current[0] = el}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="input-group" ref={el => inputRefs.current[1] = el}>
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              showStrength={true}
            />
          </div>

          <div className="input-group" ref={el => inputRefs.current[2] = el}>
            <PasswordInput
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              confirmValue={password}
            />
          </div>

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          
          <button 
            type="submit" 
            className="auth-button"
            disabled={loading || !isFormValid}
            ref={el => inputRefs.current[3] = el}
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className="terms">
          By signing up, you agree to our Terms, Privacy Policy and Cookies Policy.
        </p>

        <div className="divider">
          <span>OR</span>
        </div>

        <p className="auth-switch">
          Have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
