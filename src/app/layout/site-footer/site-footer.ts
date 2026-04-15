import { Component, inject } from '@angular/core';
import { SiteDataService } from '../../core/site-data';

@Component({
  selector: 'app-site-footer',
  imports: [],
  templateUrl: './site-footer.html',
  styleUrl: './site-footer.scss',
})
export class SiteFooter {
  readonly site = inject(SiteDataService);
  readonly year = new Date().getFullYear();
}
