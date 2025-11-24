export const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || (process.env.NODE_ENV === "development" ? "http://localhost:8000" : "");

export const apiFetch = (path, options = {}) => {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const url = `${API_BASE_URL}${normalized}`;
  return fetch(url, options);
};


