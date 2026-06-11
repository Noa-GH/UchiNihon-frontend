import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { signin, getCurrentUser } from '@/utils/api';
import { useAuth } from '@/hooks/customHooks/useAuth';
import './Login.css';

function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const { token } = await signin(email, password);
      const user = await getCurrentUser(token);
      login(token, user);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError((err as Error).message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="login">
      <div className="login__card">
        <h1 className="login__title">Welcome back</h1>
        <p className="login__subtitle">Sign in to access your saved homes</p>

        {error && (
          <div className="login__error" role="alert">
            {error}
          </div>
        )}

        <form className="login__form" onSubmit={handleSubmit} noValidate>
          <div className="login__field">
            <label className="login__label" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              type="email"
              className="login__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>
          <div className="login__field">
            <label className="login__label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="login__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>
          <button type="submit" className="login__submit" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="login__footer">
          Don't have an account?{' '}
          <Link to="/register" className="login__link">
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Login;
