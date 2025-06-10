import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms'; // <--- Important: Import FormControl

@Component({
  selector: 'app-input-field',
  standalone: false,
  templateUrl: './input-field.html',
  styleUrl: './input-field.scss'
})


export class InputField implements OnChanges {
   /**
   * @description A unique ID for the input element, crucial for accessibility (linking with label).
   * This should be provided by the parent component using `app-input-field`.
   */
  @Input() id: string = ''; // NEW INPUT PROPERTY: Unique ID for the input

  /**
   * @description The label text displayed above the input field.
   */
  @Input() label: string = '';

  /**
   * @description The placeholder text inside the input field.
   */
  @Input() placeholder: string = '';

  /**
   * @description The HTML input type (e.g., 'text', 'password', 'email', 'number').
   * Defaults to 'text'.
   */
  @Input() type: string = 'text';

  /**
   * @description The Angular FormControl instance associated with this input.
   * This is crucial for integrating with Reactive Forms and handling validation.
   */
  @Input() control: FormControl = new FormControl(); // Default to a new FormControl to avoid errors if not provided

  /**
   * @description An explicit error message to display if the control is invalid.
   * If not provided, it will try to derive a generic message or be empty.
   */
  @Input() errorMessage: string | null = null;

  /**
   * @description Internal property to track if the control is currently invalid and touched/dirty.
   * Used to apply error styling and display messages.
   * (Note: This property is optional as error states are primarily handled in the template via ngClass and ngIf).
   */
  hasError: boolean = false;

  /**
   * @description Lifecycle hook that responds when Angular sets or resets data-bound input properties.
   * We use it here to re-evaluate the error state if the 'control' or 'errorMessage' inputs change.
   */
  ngOnChanges(changes: SimpleChanges): void {
    // Re-evaluate error state whenever control or error message inputs change
    if (changes['control'] || changes['errorMessage']) {
      this.updateErrorState();
    }
  }

  /**
   * @description Updates the internal 'hasError' property based on the FormControl's validity and interaction state.
   * This method is called internally when inputs change.
   */
  private updateErrorState(): void {
    if (this.control) {
      this.hasError = this.control.invalid && (this.control.dirty || this.control.touched);
    } else {
      this.hasError = false;
    }
  }
}