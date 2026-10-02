import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Unhandled UI exception captured by ErrorBoundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-canvas px-4 py-12 text-ink-primary">
          <div className="max-w-md w-full rounded-panel border border-border-subtle bg-surface p-8 shadow-card text-center space-y-5">
            <div className="mx-auto w-12 h-12 rounded-full bg-accent-blue-light/30 flex items-center justify-center text-accent-blue">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h2 className="font-heading text-xl font-bold text-ink-primary">Something went wrong</h2>
              <p className="text-sm text-ink-secondary leading-relaxed">
                An unexpected interface issue occurred. You can reload the page to restore full service.
              </p>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={this.handleReset}
                className="btn-primary w-full justify-center inline-flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reload Page</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
