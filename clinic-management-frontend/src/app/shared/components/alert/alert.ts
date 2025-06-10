import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: false,
  templateUrl: './alert.html',
  styleUrl: './alert.scss'
})
export class Alert {

  /**
   * @description The main message content to be displayed in the alert.
   */
  @Input() message: string = '';

  /**
   * @description Defines the type of alert, which dictates its styling (color, background).
   * Options: 'success', 'error', 'warning', 'info'.
   */
  @Input() type: 'success' | 'error' | 'warning' | 'info' = 'info';

  /**
   * @description If `true`, a close button will be displayed, allowing the user to dismiss the alert.
   */
  @Input() closable: boolean = false;

  /**
   * @description Emits an event when the close button is clicked (if `closable` is true).
   * The parent component can use this to hide or remove the alert.
   */
  @Output() closed = new EventEmitter<void>();

  /**
   * @description Handles the click event on the close button and emits the 'closed' event.
   */
  onClose(): void {
    this.closed.emit();
  }
}
