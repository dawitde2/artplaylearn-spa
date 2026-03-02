import { authService } from "./authService";

export async function apiFetch(path, options = {}) {
  const response = await fetch(`http://localhost:5000/api${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authService.getToken()}`,
      ...options.headers,
    },
  });

  if (response.status === 401) {
    authService.logout();
    window.location.href = "/login";
    return;
  }

  return response.json();
}

// Usage example:
// const data = await apiFetch('/students');
