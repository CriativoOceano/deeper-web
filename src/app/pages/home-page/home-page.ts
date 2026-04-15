import { isPlatformBrowser } from '@angular/common';
import { Component, DestroyRef, HostListener, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { About } from '../../sections/about/about';
import { Events } from '../../sections/events/events';
import { FinalCta } from '../../sections/final-cta/final-cta';
import { Hero } from '../../sections/hero/hero';
import { Purpose } from '../../sections/purpose/purpose';
import { GlassHeader } from '../../layout/glass-header/glass-header';
import { Shell } from '../../layout/shell/shell';
import { SiteFooter } from '../../layout/site-footer/site-footer';

@Component({
  selector: 'app-home-page',
  imports: [
    Shell,
    GlassHeader,
    Hero,
    About,
    Purpose,
    Events,
    FinalCta,
    SiteFooter,
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly splashTimeouts: ReturnType<typeof setTimeout>[] = [];

  readonly isAtTop = signal(true);
  /** 1 = primeira frase, 2 = convite DEEPER, 3 = saída animada */
  readonly splashPhase = signal<1 | 2 | 3>(1);
  readonly splashDismissed = signal(false);

  constructor() {
    this.destroyRef.onDestroy(() => {
      for (const id of this.splashTimeouts) {
        clearTimeout(id);
      }
      if (isPlatformBrowser(this.platformId)) {
        document.body.style.overflow = '';
      }
    });
  }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.splashDismissed.set(true);
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.splashDismissed.set(true);
      return;
    }

    document.body.style.overflow = 'hidden';

    this.splashTimeouts.push(
      window.setTimeout(() => {
        this.splashPhase.set(2);
      }, 3200),
    );

    this.splashTimeouts.push(
      window.setTimeout(() => {
        this.splashPhase.set(3);
      }, 6400),
    );

    this.splashTimeouts.push(
      window.setTimeout(() => {
        document.body.style.overflow = '';
        this.splashDismissed.set(true);
      }, 7700),
    );
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isAtTop.set(window.scrollY < 12);
  }
}
