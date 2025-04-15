import { Component } from '@angular/core';
import { ServiceService }from '../service.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('expandOnHover', [
      state('normal', style({
        transform: 'scale(1)'
      })),
      state('expanded', style({
        transform: 'scale(1.5)'
      })),
      transition('normal <=> expanded', [
        animate('200ms ease-in-out')
      ])
    ])
  ]
})
export class HomeComponent {
  currencyData: any;
  isHovering = false;
  constructor(private api: ServiceService) {}

  async ngOnInit() {
    this.currencyData = await this.api.getRates();
    console.log('Currency API Response:', this.currencyData);
  }

  
}
