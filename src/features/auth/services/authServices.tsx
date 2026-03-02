const API_URL = "http://localhost:5000/api"; // adjust to your API port

export const authService = {
  async login(email, password) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Login failed");
    }

    const data = await response.json(); // { accessToken: "..." }
    localStorage.setItem("accessToken", data.accessToken);
    return data;
  },

  logout() {
    localStorage.removeItem("accessToken");
  },

  getToken() {
    return localStorage.getItem("accessToken");
  },

  isAuthenticated() {
    const token = this.getToken();
    if (!token) return false;

    // Check token expiry from JWT payload
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  },

  getUser() {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return {
        email: payload.email,
        role: payload[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ],
      };
    } catch {
      return null;
    }
  },
};
