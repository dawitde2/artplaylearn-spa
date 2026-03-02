import React from "react";
import LoginForm from "./LoginForm";

const LoginPage: React.FC = () => {
  const handleLoginSuccess = (token: string, decoded: any) => {
    // Save token in localStorage/sessionStorage or React context
    localStorage.setItem("accessToken", token);
    console.log("User logged in, decoded token:", decoded);

    // Redirect to dashboard or home page
    // e.g., navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </div>
  );
};

export default LoginPage;
