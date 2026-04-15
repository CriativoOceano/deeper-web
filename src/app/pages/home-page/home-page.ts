import { Component, HostListener, OnInit, signal } from '@angular/core';
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
  readonly isAtTop = signal(true);
  readonly isLoaded = signal(false);

  ngOnInit(): void {
    requestAnimationFrame(() => {
      this.isLoaded.set(true);
    });
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isAtTop.set(window.scrollY < 12);
  }
}
