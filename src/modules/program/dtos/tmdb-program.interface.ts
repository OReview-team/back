export interface ITmdbProgramResponse {
  page: number;
  results: ITmdbProgramList[];
}

export interface ITmdbProgramList {
  id: number;
  genre_ids: number[];
  title: string;
  overview: string;
  release_date: Date;
  vote_average: number;
  vote_count: number;
  adult: boolean;
  backdrop_path: string;
  original_language: string;
  original_title: string;
  popularity: number;
  poster_path: string;
  video: boolean;
}
