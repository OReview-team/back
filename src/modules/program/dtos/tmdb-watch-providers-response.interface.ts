export interface ITmdbWatchProvidersResponse {
  result: ITmdbWatchProvider[];
}

export interface ITmdbWatchProvider {
  display_priorities: Record<string, number>;
  display_priority: number;
  logo_path: string;
  provider_name: string;
  provider_id: number;
}
