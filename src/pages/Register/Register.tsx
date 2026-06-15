import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup, signin, getCurrentUser } from '@/utils/api';
import { useAuth } from '@/hooks/customHooks/useAuth';
import './Register.css';

function Register() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const errors: { name?: string; email?: string; password?: string } = {};
    if (!name.trim()) {
      errors.name = 'Name is required';
    } else if (name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      errors.email = 'Email address is required';
    } else if (!emailRegex.test(email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // Register, then immediately sign in so the user is logged in right away.
      await signup(name, email, password);
      const { token } = await signin(email, password);
      const user = await getCurrentUser(token);
      login(token, user);
      navigate('/');
    } catch (err) {
      const errMsg = (err as Error).message || 'Registration failed. Please try again.';
      if (
        errMsg.toLowerCase().includes('email already exists') ||
        errMsg.toLowerCase().includes('duplicate key')
      ) {
        setFieldErrors({ email: 'This email address is already in use.' });
      } else {
        setError(errMsg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="register">
      <div className="register__card">
        <h1 className="register__title">Create account</h1>
        <p className="register__subtitle">Start saving your favourite akiya properties</p>

        {error && (
          <div className="register__error" role="alert">
            {error}
          </div>
        )}

        <form className="register__form" onSubmit={handleSubmit} noValidate>
          <div className="register__field">
            <label className="register__label" htmlFor="name">
              Your name
            </label>
            <input
              id="name"
              type="text"
              className={`register__input ${fieldErrors.name ? 'register__input--error' : ''}`}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (fieldErrors.name) setFieldErrors((prev) => ({ ...prev, name: undefined }));
              }}
              minLength={2}
              autoComplete="name"
              required
            />
            {fieldErrors.name && <span className="register__field-error">{fieldErrors.name}</span>}
          </div>
          <div className="register__field">
            <label className="register__label" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              type="email"
              className={`register__input ${fieldErrors.email ? 'register__input--error' : ''}`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: undefined }));
              }}
              autoComplete="email"
              required
            />
            {fieldErrors.email && (
              <span className="register__field-error">{fieldErrors.email}</span>
            )}
          </div>
          <div className="register__field">
            <label className="register__label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className={`register__input ${fieldErrors.password ? 'register__input--error' : ''}`}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (fieldErrors.password)
                  setFieldErrors((prev) => ({ ...prev, password: undefined }));
              }}
              minLength={6}
              autoComplete="new-password"
              required
            />
            {fieldErrors.password && (
              <span className="register__field-error">{fieldErrors.password}</span>
            )}
          </div>
          <button type="submit" className="register__submit" disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="register__footer">
          Already have an account?{' '}
          <Link to="/login" className="register__link">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Register;
