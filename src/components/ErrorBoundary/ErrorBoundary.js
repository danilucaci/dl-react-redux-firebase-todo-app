import React, { Component } from "react";

class ErrorBoundary extends Component {
  state = {
    error: null,
    errorInfo: null,
    hasError: null,
  };

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("CDC: ", error);
    console.error("CDC: ", errorInfo);

    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div
          style={{
            maxWidth: "800px",
            padding: "24px",
            border: "1px solid lightgrey",
            borderRadius: "3px",
            margin: "0 auto",
            marginTop: "2rem",
            fontFamily: "system-ui",
          }}
        >
          <h1
            style={{
              fontSize: "24px",
              lineHeight: "32px",
              marginTop: "0px",
              marginBottom: "16px",
              paddingTop: "0px",
            }}
          >
            Shomething went wrong
          </h1>
          <p>
            I apologize for any inconvenience this may have caused. If you would
            like to send me a report of the error, feel free to send me an email
            or a tweet with the details.
          </p>
          <ul
            style={{
              marginTop: "1rem",
            }}
          >
            <li
              style={{
                fontSize: "16px",
                lineHeight: "24px",
                textDecoration: "underline",
                color: "#0946B0",
              }}
            >
              <a href="mailto:info@danilucaci.com?subject=Todo%App%Error%20Report">
                info@danilucaci.com
              </a>
            </li>
            <li
              style={{
                fontSize: "16px",
                lineHeight: "24px",
                textDecoration: "underline",
                color: "#0946B0",
              }}
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://twitter.com/danilucaci"
              >
                @danilucaci
              </a>
            </li>
          </ul>

          <details style={{ whiteSpace: "pre-wrap", marginTop: "2rem" }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}

export default ErrorBoundary;
