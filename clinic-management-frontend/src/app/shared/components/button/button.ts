import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: false,
  templateUrl: './button.html',
  styleUrl: './button.scss'
})

export class Button {

  @Input() buttonType: 'primary' | 'secondary' | 'danger' | 'info' | 'warning' | 'success' | 'tertiary' | 'link' = 'primary';
  @Input() isDisabled: boolean = false; // Added for convenience, though [disabled] works
  @Input() fullWidth: boolean = false; // For block-level buttons

  /**
   * @description Defines the visual style and semantic purpose of the button.
   * - 'primary': Main action button (e.g., Save, Submit)
   * - 'secondary': Less emphasized action (e.g., Cancel, Back)
   * - 'danger': Destructive action (e.g., Delete, Remove)
   * - 'link': Behaves like a link but with button accessibility
   */
  @Input() type: 'button' | 'submit' | 'reset' = 'button'; // <--- ADD THIS LINE
  /**
   * @description Sets the size of the button.
   * Options: 'small', 'medium' (default), 'large'.
   */
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * @description Disables the button, preventing clicks and changing its appearance.
   */
  @Input() disabled: boolean = false;

  /**
   * @description Shows a loading indicator inside the button and disables it.
   */
  @Input() loading: boolean = false;

  /**
   * @description An optional label for accessibility, especially when the button content is an icon.
   * Not directly rendered but passed to aria-label.
   */
  @Input() label: string = '';

  /**
   * @description Emits an event when the button is clicked, unless it's disabled or loading.
   */
  @Output() click = new EventEmitter<void>();

  /**
   * @description Handles the button click event.
   * Emits the click event only if the button is not disabled and not in a loading state.
   */
  onClick(): void {
    if (!this.disabled && !this.loading) {
      this.click.emit();
    }
  }
}