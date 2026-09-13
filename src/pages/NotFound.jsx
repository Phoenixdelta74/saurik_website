import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Mail, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center space-y-6">
      <div className="inline-flex items-center justify-center p-3 bg-slate-100 rounded-full text-ink-muted">
        <span className="font-mono text-2xl font-bold">404</span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-ink-primary font-heading">
        Page Not Found
      </h1>

      <p className="text-base text-ink-secondary leading-relaxed max-w-md mx-auto">
        The page you are looking for does not exist or may have been moved as part of our website redesign.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Link to="/" className="btn-primary text-sm py-3 px-6">
          <Home className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
        <Link to="/contact" className="btn-secondary text-sm py-3 px-6">
          <Mail className="w-4 h-4" />
          <span>Contact Support</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
