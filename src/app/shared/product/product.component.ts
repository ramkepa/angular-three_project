import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  animations: [
    trigger('flipState', [
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      state('active', style({
        transform: 'rotateY(180deg)'
      })),
      transition('inactive => active', animate('400ms ease-out')),
      transition('active => inactive', animate('400ms ease-in'))
    ])
  ]
})
export class ProductComponent {
  constructor(private router: Router){}
    

  
  flip: 'active' | 'inactive' = 'inactive';

  toggleFlip(): void {
    this.flip = this.flip === 'inactive' ? 'active' : 'inactive';
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }
}
