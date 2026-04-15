import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';
import type { DeeperEvent, SiteApiResponse, SiteConfig } from './models';

const DEFAULT_CONFIG: SiteConfig = {
  siteTitle: 'Deeper',
  instagram: 'https://www.instagram.com/deeper.aguasclaras/',
  churchName: 'Igreja Oceano da Graça',
  mainSiteUrl: 'https://www.oceanodagraca.com/',
  aboutImageUrl:
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
};

@Injectable({
  providedIn: 'root',
})
export class SiteDataService {
  private readonly http = inject(HttpClient);

  private readonly response = signal<SiteApiResponse | null>(null);
  readonly loadError = signal(false);

  readonly config = computed(() => {
    const c = this.response()?.config;
    if (!c) return DEFAULT_CONFIG;
    return { ...DEFAULT_CONFIG, ...c };
  });

  readonly events = computed(() => {
    const list = this.response()?.events ?? [];
    return list
      .filter((e) => this.isActive(e))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 6);
  });

  constructor() {
    this.load();
  }

  load(): void {
    this.loadError.set(false);
    const primary = environment.eventsApiUrl?.trim();

    const request$ = primary
      ? this.http.get<SiteApiResponse>(primary).pipe(
          catchError(() => this.http.get<SiteApiResponse>('/mock-api.json')),
        )
      : this.http.get<SiteApiResponse>('/mock-api.json');

    request$
      .pipe(
        catchError(() => {
          this.loadError.set(true);
          return of<SiteApiResponse>({ config: DEFAULT_CONFIG, events: [] });
        }),
        tap((body) => this.response.set(body)),
      )
      .subscribe();
  }

  private isActive(e: DeeperEvent): boolean {
    if (typeof e.active === 'boolean') return e.active;
    const s = String(e.active).toUpperCase();
    return s === 'TRUE' || s === '1' || s === 'YES';
  }
}
