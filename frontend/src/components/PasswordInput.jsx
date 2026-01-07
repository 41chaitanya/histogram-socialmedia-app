import { useState } from 'react';

const PasswordInput = ({ 
  value, 
  onChange, 
  placeholder = "Password",
  showStrength = false,
  confirmValue = null // For confirm password matching
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // Password strength checker
  const getPasswordStrength = (password) => {
    if (!password) return { level: 0, text: '', color: '' };
    
    let strength = 0;
    
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

    const levels = [
      { level: 0, text: '', color: '' },
      { level: 1, text: 'Very Weak', color: '#ed4956' },
      { level: 2, text: 'Weak', color: '#ff6b6b' },
      { level: 3, text: 'Fair', color: '#ffa502' },
      { level: 4, text: 'Strong', color: '#78e08f' },
      { level: 5, text: 'Very Strong', color: '#05c46b' }
    ];

    return levels[Math.min(strength, 5)];
  };

  const strength = showStrength ? getPasswordStrength(value) : null;
  
  // Check if confirm password matches
  const isMatching = confirmValue !== null ? value === confirmValue && value !== '' : null;

  return (
    <div className="password-input-wrapper">
      <div className="input-with-icon">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
          className={confirmValue !== null && value ? (isMatching ? 'match' : 'no-match') : ''}
        />
        <button
          type="button"
          className="eye-button"
          onClick={() => setShowPassword(!showPassword)}
          tabIndex={-1}
        >
          {showPassword ? (
            // Eye off icon
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
              <line x1="1" y1="1" x2="23" y2="23"/>
            </svg>
          ) : (
            // Eye icon
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          )}
        </button>
      </div>

      {/* Password Strength Indicator */}
      {showStrength && value && (
        <div className="password-strength">
          <div className="strength-bars">
            {[1, 2, 3, 4, 5].map((level) => (
              <div
                key={level}
                className={`strength-bar ${strength.level >= level ? 'active' : ''}`}
                style={{ backgroundColor: strength.level >= level ? strength.color : '' }}
              />
            ))}
          </div>
          <span className="strength-text" style={{ color: strength.color }}>
            {strength.text}
          </span>
        </div>
      )}

      {/* Confirm Password Match Indicator */}
      {confirmValue !== null && value && (
        <div className={`match-indicator ${isMatching ? 'matching' : 'not-matching'}`}>
          {isMatching ? '✓ Passwords match' : '✗ Passwords do not match'}
        </div>
      )}
    </div>
  );
};

export default PasswordInput;
