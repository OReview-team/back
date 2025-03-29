export interface ITmdbWatchProvidersResponse {
  results: ITmdbWatchProvider[];
}

export interface ITmdbWatchProvider {
  display_priorities: Record<string, number>;
  display_priority: number;
  logo_path: string;
  provider_name: string;
  provider_id: number;
}

export class WatchProviderResponseDto {
  tmdbProviderId: number;

  name: string;

  logoPath: string;

  constructor(provider: ITmdbWatchProvider) {
    this.tmdbProviderId = provider.provider_id;
    this.name = provider.provider_name;
    this.logoPath = provider.logo_path;
  }
}
