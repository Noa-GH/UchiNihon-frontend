import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { signin, getCurrentUser } from '@/utils/api';
import { useAuth } from '@/hooks/customHooks/useAuth';
import { useFormAndValidation } from '@/hooks/customHooks/useFormAndValidation';
import { loginSchema } from '@/utils/validation';
import Form from '@/components/Form/Form';
import './Login.css';

function Login() {
  const { values, handleChange, errors, validateWithZod } = useFormAndValidation({ email: '', password: '' });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    
    if (!validateWithZod(loginSchema)) {
      return;
    }

    setIsLoading(true);
    try {
      const { token } = await signin(values.email, values.password);
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
      <Form
        title="Welcome back"
        subtitle="Sign in to access your saved homes"
        error={error}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitText="Sign In"
        loadingText="Signing in..."
        footer={
          <>
            Don't have an account?{' '}
            <Link to="/register" className="auth-link">
              Create one
            </Link>
          </>
        }
      >
        <div className="auth-field">
          <label className="auth-label" htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={`auth-input ${errors.email ? 'auth-input--error' : ''}`}
            value={values.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />
          {errors.email && <span className="auth-field-error">{errors.email}</span>}
        </div>
        <div className="auth-field">
          <label className="auth-label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className={`auth-input ${errors.password ? 'auth-input--error' : ''}`}
            value={values.password}
            onChange={handleChange}
            autoComplete="current-password"
            required
          />
          {errors.password && <span className="auth-field-error">{errors.password}</span>}
        </div>
      </Form>
    </main>
  );
}

export default Login;
