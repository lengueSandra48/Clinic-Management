import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: false,
  templateUrl: './spinner.html',
  styleUrl: './spinner.scss'
})

export class Spinner {
  /**
   * @description Controls the visibility of the spinner. Set to `true` to show, `false` to hide.
   */
  @Input() isVisible: boolean = false;

  /**
   * @description Defines the size of the spinner.
   * Options: 'small' (e.g., for buttons), 'medium' (default), 'large' (e.g., full-page).
   */
  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * @description Sets the color theme of the spinner.
   * Options: 'primary' (clinic's main color), 'accent' (a secondary highlight color), 'warn' (for errors/warnings).
   */
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';
}
