import { Component, HostListener, inject, signal } from '@angular/core';
import { SiteDataService } from '../../core/site-data';

@Component({
  selector: 'app-glass-header',
  imports: [],
  templateUrl: './glass-header.html',
  styleUrl: './glass-header.scss',
})
export class GlassHeader {
  readonly site = inject(SiteDataService);
  readonly isAtTop = signal(true);
  readonly isMenuOpen = signal(false);

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isAtTop.set(window.scrollY < 12);
    if (this.isMenuOpen()) this.isMenuOpen.set(false);
  }

  scrollTo(ev: Event, id: string): void {
    ev.preventDefault();
    this.isMenuOpen.set(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  toggleMenu(): void {
    this.isMenuOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}
