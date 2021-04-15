import React from 'react';

type MyState = {
  hasError: boolean; // like this
};

type MyProps = {
  fallbackComponent: React.ReactNode; // like this
};

class ErrorBoundary extends React.Component<MyProps, MyState> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: boolean): MyState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo): void {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallbackComponent;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
