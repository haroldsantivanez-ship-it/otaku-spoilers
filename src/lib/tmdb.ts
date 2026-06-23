import axios from "axios";

export const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
    language: "es-ES",
  },
});

export const IMG_BASE = "https://image.tmdb.org/t/p";
export const posterUrl = (path: string | null) =>
  path ? `${IMG_BASE}/w500${path}` : "/placeholder.jpg";
export const backdropUrl = (path: string | null) =>
  path ? `${IMG_BASE}/original${path}` : "";
