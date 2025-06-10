import { Directive, ElementRef, Input, OnInit } from '@angular/core';

/**
 * @description An attribute directive that automatically sets focus on the host element
 * when it is initialized. Useful for improving user experience in forms or modals.
 *
 * @usage
 * Apply to an input or other focusable element: `<input type="text" appAutoFocus>`
 * Or conditionally: `<input type="text" *ngIf="showInput" appAutoFocus>`
 */


@Directive({
  selector: '[appAutoFocus]',
  standalone: false
})

export class AutoFocus implements OnInit {
  /**
   * @description Optional delay in milliseconds before applying focus.
   * Useful if the element might not be immediately ready for focus (e.g., after an animation).
   * Defaults to 0ms (immediate).
   */
  @Input() appAutoFocusDelay: number = 0;

  constructor(private el: ElementRef) { }

  /**
   * @description Lifecycle hook called after data-bound properties are initialized.
   * Sets focus on the native element, optionally after a delay.
   */
  ngOnInit(): void {
    // Using setTimeout to ensure the element is rendered and ready for focus,
    // especially useful in cases like *ngIf or components that render asynchronously.
    setTimeout(() => {
      this.el.nativeElement.focus();
    }, this.appAutoFocusDelay);
  }
}
