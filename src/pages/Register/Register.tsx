import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup, signin, getCurrentUser } from '@/utils/api';
import { useAuth } from '@/hooks/customHooks/useAuth';
import { useFormAndValidation } from '@/hooks/customHooks/useFormAndValidation';
import { registerSchema } from '@/utils/validation';
import Form from '@/components/Form/Form';
import './Register.css';

function Register() {
  const { values, handleChange, errors, validateWithZod, setErrors } = useFormAndValidation({ name: '', email: '', password: '' });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!validateWithZod(registerSchema)) {
      return;
    }

    setIsLoading(true);
    try {
      await signup(values.name, values.email, values.password);
      const { token } = await signin(values.email, values.password);
      const user = await getCurrentUser(token);
      login(token, user);
      navigate('/');
    } catch (err) {
      const errMsg = (err as Error).message || 'Registration failed. Please try again.';
      if (
        errMsg.toLowerCase().includes('email already exists') ||
        errMsg.toLowerCase().includes('duplicate key')
      ) {
        setErrors((prev) => ({ ...prev, email: 'This email address is already in use.' }));
      } else {
        setError(errMsg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="register">
      <Form
        title="Create account"
        subtitle="Start saving your favourite akiya properties"
        error={error}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitText="Create Account"
        loadingText="Creating account..."
        footer={
          <>
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Sign in
            </Link>
          </>
        }
      >
        <div className="auth-field">
          <label className="auth-label" htmlFor="name">
            Your name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className={`auth-input ${errors.name ? 'auth-input--error' : ''}`}
            value={values.name}
            onChange={handleChange}
            minLength={2}
            autoComplete="name"
            required
          />
          {errors.name && <span className="auth-field-error">{errors.name}</span>}
        </div>
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
            minLength={6}
            autoComplete="new-password"
            required
          />
          {errors.password && <span className="auth-field-error">{errors.password}</span>}
        </div>
      </Form>
    </main>
  );
}

export default Register;
