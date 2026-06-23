import { tmdb } from "@/lib/tmdb";
import type { Movie, MovieDetail, TMDBResponse, Video } from "@/lib/types";

export async function getNowPlaying(): Promise<Movie[]> {
  const { data } = await tmdb.get<TMDBResponse<Movie>>("/movie/now_playing");
  return data.results;
}

export async function getPopular(): Promise<Movie[]> {
  const { data } = await tmdb.get<TMDBResponse<Movie>>("/movie/popular");
  return data.results;
}

export async function getMovieById(id: number): Promise<MovieDetail> {
  const { data } = await tmdb.get<MovieDetail>(`/movie/${id}`);
  return data;
}

export async function getMovieVideos(id: number): Promise<Video[]> {
  const { data } = await tmdb.get<{ results: Video[] }>(
    `/movie/${id}/videos`,
    { params: { language: "es-ES" } },
  );

  // Si no hay videos en español, buscar en inglés
  if (data.results.length === 0) {
    const { data: enData } = await tmdb.get<{ results: Video[] }>(
      `/movie/${id}/videos`,
      { params: { language: "en-US" } },
    );
    return enData.results;
  }

  return data.results;
}
