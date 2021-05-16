// Reference: https://reactjs.org/docs/error-boundaries.html

import { Component } from "react";
import { Link, Redirect } from "react-router-dom";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      redirect: false,
    };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error("ErrorBoundary:", error, info);
  }
  componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => this.setState({ redirect: true }), 5000);
    }
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    } else if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>An unexpected error has occurred!</h2>
          <h3>
            Return to the <Link to="/">homepage</Link> or you will be redirected
            in 5 seconds...
          </h3>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
