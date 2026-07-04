import React from "react";
import './Form.css';

interface FormProps {
  title: string;
  subtitle: string;
  error?: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  submitText: string;
  loadingText: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}

function Form({
  title, subtitle, error, onSubmit, isLoading, submitText, loadingText, children, footer
}: FormProps) {
  return (
    <div className="auth-card">
      <h1 className="auth-title">{title}</h1>
      <p className="auth-subtitle">{subtitle}</p>

      {error && (
        <div className="auth-error" role="alert">
          {error}
        </div>
      )}

      <form className="auth-form" onSubmit={onSubmit} noValidate>
        {children}
        <button type="submit" className="auth-submit" disabled={isLoading}>
          {isLoading ? loadingText : submitText}
        </button>
      </form>

      <div className="auth-footer">
        {footer}
      </div>
    </div>
  );
}

export default Form;
