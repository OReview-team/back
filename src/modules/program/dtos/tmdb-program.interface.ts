export interface ITmdbProgramResponse {
  page: number;
  results: ITmdbMovieList[];
}

export interface ITmdbMovieList {
  id: number;
  genre_ids: number[];
  title: string;
  overview: string;
  release_date: Date;
  vote_average: number;
  vote_count: number;
  adult: boolean;
  backdrop_path: string | null;
  original_language: string;
  original_title: string;
  popularity: number;
  poster_path: string;
  video: boolean;
}

export interface ITmdbTvList {
  id: number;
  genre_ids: number[];
  name: string;
  overview: string;
  backdrop_path: string | null;
  poster_path: string;
  first_air_date: Date;
  vote_average: number;
  vote_count: number;
  adult: boolean;
  origin_country: string[];
  original_language: string;
  original_name: string;
}
