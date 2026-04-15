import { Component, inject } from '@angular/core';
import { SiteDataService } from '../../core/site-data';

@Component({
  selector: 'app-final-cta',
  imports: [],
  templateUrl: './final-cta.html',
  styleUrl: './final-cta.scss',
})
export class FinalCta {
  readonly site = inject(SiteDataService);
}
