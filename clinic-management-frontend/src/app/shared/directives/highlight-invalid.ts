import { Directive, ElementRef, HostListener, Renderer2, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms'; // Important for accessing FormControl

/**
 * @description An attribute directive that visually highlights an input field
 * with an 'is-invalid' class when its associated FormControl is invalid and has been touched or is dirty.
 * Designed to work with Angular Reactive Forms.
 *
 * @usage
 * Apply to any input field that is bound to a FormControl:
 * `<input type="text" [formControl]="myControl" appHighlightInvalid>`
 */

@Directive({
  selector: '[appHighlightInvalid]',
  standalone: false
})

export class HighlightInvalid implements OnInit {

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private control: NgControl // Inject NgControl to get access to the FormControl
  ) {
    // NgControl is available only if the directive is applied to an element that also has ngModel or formControl
  }

  /**
   * @description Lifecycle hook called after data-bound properties are initialized.
   * Subscribes to the control's value and status changes to update the highlight.
   */
  ngOnInit(): void {
    if (this.control && this.control.statusChanges) {
      this.control.statusChanges.subscribe(() => this.updateHighlight());
      // Also update initially in case it's already invalid/touched
      this.updateHighlight();
    }
  }

  /**
   * @description HostListener for blur event. Ensures the highlight is applied when the user leaves the field.
   */
  @HostListener('blur')
  onBlur(): void {
    this.updateHighlight();
  }

  /**
   * @description Updates the 'is-invalid' class on the host element based on the FormControl's state.
   */
  private updateHighlight(): void {
    if (this.control && this.control.control) { // Ensure control and its underlying FormControl exist
      const formControl = this.control.control;
      // Check if invalid AND (touched OR dirty)
      if (formControl.invalid && (formControl.touched || formControl.dirty)) {
        this.renderer.addClass(this.el.nativeElement, 'is-invalid');
      } else {
        this.renderer.removeClass(this.el.nativeElement, 'is-invalid');
      }
    }
  }
}