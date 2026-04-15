import { Component, computed, inject, signal } from '@angular/core';
import { SiteDataService } from '../../core/site-data';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  private readonly site = inject(SiteDataService);
  private readonly broken = signal(false);

  readonly imageSrc = computed(() => {
    if (this.broken()) {
      return 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80';
    }
    return (
      this.site.config().aboutImageUrl ??
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80'
    );
  });

  onImgError(): void {
    this.broken.set(true);
  }
}
