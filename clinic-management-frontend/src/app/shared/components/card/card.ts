import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.html',
  styleUrl: './card.scss'
})
export class Card {

  /**
   * @description The title text displayed in the card header.
   * If not provided, the header section will not be displayed.
   */
  @Input() title: string = '';
}
