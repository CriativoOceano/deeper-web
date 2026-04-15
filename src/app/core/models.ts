export interface SiteConfig {
  siteTitle: string;
  instagram: string;
  churchName: string;
  mainSiteUrl: string;
  aboutImageUrl?: string;
}

export interface DeeperEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  image: string;
  description: string;
  formUrl: string;
  /** Planilha pode mandar boolean ou string (TRUE/FALSE) */
  active: boolean | string;
}

export interface SiteApiResponse {
  config: SiteConfig;
  events: DeeperEvent[];
}
