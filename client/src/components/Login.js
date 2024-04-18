import React, { useState, useEffect } from 'react';
import './Login.css';
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';
import DOMPurify from 'dompurify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import IntroJs from 'intro.js';
import 'intro.js/introjs.css';

const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isUppercaseValid, setIsUppercaseValid] = useState(false);
  const [isLowercaseValid, setIsLowercaseValid] = useState(false);
  const [isNumberValid, setIsNumberValid] = useState(false);
  const [isSpecialCharValid, setIsSpecialCharValid] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const intro = IntroJs();
    intro.setOptions({
      steps: [
        {
          title: 'Welcome to Login Page!',
          intro: 'This is a guided tour for the login form.',
        },
        {
            element: document.querySelector('.input-name'),

            intro: 'Please enter your name',
          },
          {
            element: document.querySelector('.input-email'),

            intro: 'Please enter your email',
          },
        {
          element: document.querySelector('.input-container'),
          intro: 'Please enter your password  must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)',
        },
        {
          element: document.querySelector('.submit__btn'),
          intro: 'Click this button to submit your login information.',
        },
      ],
    });
    intro.start();

    return () => {
      intro.exit();
    };
  }, []);

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    setIsUppercaseValid(/[A-Z]/.test(value));
    setIsLowercaseValid(/[a-z]/.test(value));
    setIsNumberValid(/\d/.test(value));
    setIsSpecialCharValid(/[@$!%*?&]/.test(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setPasswordError('');

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      setPasswordError(
        'Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)'
      );
      return;
    }

    const sanitizedEmail = DOMPurify.sanitize(email);
    const sanitizedPassword = DOMPurify.sanitize(password);

    console.log(name, sanitizedEmail, sanitizedPassword);

    dispatch(
      login({
        name: name,
        email: sanitizedEmail,
        password: sanitizedPassword,
        loggedIn: true,
      })
    );
  };
  return (
    <div className="login">
      <form className="login__form" onSubmit={(e) => handleSubmit(e)}>
        <h1>Login Here</h1>
        <input className ="input-name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email" className ="input-email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

          <input className="input-container"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => handlePasswordChange(e)}
          />
          {password && (
            <div className="password-feedback">
              <p className={isUppercaseValid ? 'valid' : ''}>
                <FontAwesomeIcon icon={faCheckCircle} /> At least one uppercase letter
              </p>
              <p className={isLowercaseValid ? 'valid' : ''}>
                <FontAwesomeIcon icon={faCheckCircle} /> At least one lowercase letter
              </p>
              <p className={isNumberValid ? 'valid' : ''}>
                <FontAwesomeIcon icon={faCheckCircle} /> At least one number
              </p>
              <p className={isSpecialCharValid ? 'valid' : ''}>
                <FontAwesomeIcon icon={faCheckCircle} /> At least one special character (@$!%*?&)
              </p>
            </div>
          )}
        {passwordError && <p className="error">{passwordError}</p>}
        <button type="submit" className="submit__btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
