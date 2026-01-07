import { useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import gsap from 'gsap';

const Home = () => {
  const { user } = useAuth();
  const containerRef = useRef();
  const contentRef = useRef();

  useEffect(() => {
    gsap.fromTo(containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 }
    );
    
    gsap.fromTo(contentRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, delay: 0.2, ease: 'power2.out' }
    );
  }, []);

  return (
    <div className="home-page" ref={containerRef}>
      <div className="home-welcome" ref={contentRef}>
        <h1>Welcome back, {user?.username}! 👋</h1>
        <p>Your feed will appear here soon.</p>
      </div>
    </div>
  );
};

export default Home;
