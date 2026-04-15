import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { SiteDataService } from '../../core/site-data';

@Component({
  selector: 'app-events',
  imports: [DatePipe],
  templateUrl: './events.html',
  styleUrl: './events.scss',
})
export class Events {
  readonly site = inject(SiteDataService);
  private readonly brokenIds = signal<Record<string, boolean>>({});

  thumbUrl(id: string, url: string): string {
    return this.brokenIds()[id]
      ? 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80'
      : url;
  }

  onImgError(id: string): void {
    this.brokenIds.update((m) => ({ ...m, [id]: true }));
  }
}
