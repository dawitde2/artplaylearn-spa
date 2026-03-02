export interface JwtPayload {
  sub: string; // User ID
  email: string;
  role: string;
  exp: number; // Expiration timestamp
}

// Decode JWT from string
// Named export
export const decodeJWT = (token: string) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join(""),
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};

// Get JWT from localStorage and decode
export const getDecodedToken = (): JwtPayload | null => {
  const token = localStorage.getItem("accessToken");
  return decodeJWT(token || "");
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  const decoded = getDecodedToken();
  if (!decoded) return false;

  // check expiration
  const now = Date.now() / 1000; // timestamp in seconds
  return decoded.exp > now;
};
