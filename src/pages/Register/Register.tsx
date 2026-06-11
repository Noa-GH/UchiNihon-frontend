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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      // Register, then immediately sign in so the user is logged in right away.
      await signup(name, email, password);
      const { token } = await signin(email, password);
      const user = await getCurrentUser(token);
      login(token, user);
      navigate('/');
    } catch (err) {
      setError((err as Error).message || 'Registration failed. Please try again.');
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
              className="register__input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              minLength={2}
              autoComplete="name"
              required
            />
          </div>
          <div className="register__field">
            <label className="register__label" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              type="email"
              className="register__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>
          <div className="register__field">
            <label className="register__label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="register__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              autoComplete="new-password"
              required
            />
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
