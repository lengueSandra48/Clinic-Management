import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

/**
 * @description An attribute directive to apply a simple input mask to an input field.
 *
 * @usage
 * Apply to an input element: `<input type="text" appInputMask maskPattern="(999) 999-9999">`
 *
 * @maskPattern characters:
 * - '9': Numeric character (0-9)
 * - 'A': Alphabetic character (a-z, A-Z)
 * - '*': Alphanumeric character (0-9, a-z, A-Z)
 * - Any other character: Literal (e.g., '(', ')', '-', ' ')
 */

@Directive({
  selector: '[appInputMask]',
  standalone: false
})

export class InputMask {
  /**
   * @description The mask pattern to apply to the input field.
   * Example: "(999) 999-9999" for phone numbers, "99/99/9999" for dates.
   * See @maskPattern characters for valid placeholders.
   */
  @Input() maskPattern: string = '';

  private inputElement: HTMLInputElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.inputElement = this.el.nativeElement;
  }

  /**
   * @description HostListener for the 'input' event. Formats the value as the user types.
   * @param event The native input event.
   */
  @HostListener('input', ['$event'])
  // FIX: Change parameter type to 'Event' as that's what HostListener emits.
  onInput(event: Event): void {
    // Cast event.target to HTMLInputElement to access its specific properties like value, selectionStart
    const inputElement = event.target as HTMLInputElement;

    if (!this.maskPattern) {
      return; // No mask pattern provided
    }

    const value = inputElement.value;
    const selectionStart = inputElement.selectionStart || 0; // Cursor position

    // Remove non-mask characters from the current value for processing
    const cleanValue = value.replace(/[^0-9a-zA-Z]/g, '');

    let formattedValue = '';
    let patternIndex = 0;
    let valueIndex = 0;
    let newCursorPosition = selectionStart;

    while (patternIndex < this.maskPattern.length && valueIndex < cleanValue.length) {
      const patternChar = this.maskPattern[patternIndex];
      const valueChar = cleanValue[valueIndex];

      if (patternChar === '9') { // Numeric
        if (/\d/.test(valueChar)) {
          formattedValue += valueChar;
          valueIndex++;
        } else {
          // Skip non-numeric characters if pattern expects numeric
          valueIndex++;
          if (newCursorPosition > formattedValue.length) newCursorPosition--;
          continue;
        }
      } else if (patternChar === 'A') { // Alphabetic
        if (/[a-zA-Z]/.test(valueChar)) {
          formattedValue += valueChar;
          valueIndex++;
        } else {
          valueIndex++;
          if (newCursorPosition > formattedValue.length) newCursorPosition--;
          continue;
        }
      } else if (patternChar === '*') { // Alphanumeric
        if (/[0-9a-zA-Z]/.test(valueChar)) {
          formattedValue += valueChar;
          valueIndex++;
        } else {
          valueIndex++;
          if (newCursorPosition > formattedValue.length) newCursorPosition--;
          continue;
        }
      } else { // Literal character in mask
        formattedValue += patternChar;
        // Adjust cursor position if a literal is inserted before or at the cursor
        if (valueIndex === 0 && patternIndex < selectionStart) {
          newCursorPosition++;
        } else if (formattedValue.length === selectionStart + 1 && patternIndex < selectionStart) {
          newCursorPosition++;
        }
      }
      patternIndex++;
    }

    // Append any remaining literal characters from the mask if the value is complete
    while (patternIndex < this.maskPattern.length && valueIndex >= cleanValue.length) {
      const patternChar = this.maskPattern[patternIndex];
      if (patternChar === '9' || patternChar === 'A' || patternChar === '*') {
        break; // Stop if we encounter a placeholder we don't have value for
      }
      formattedValue += patternChar;
      patternIndex++;
    }

    // Ensure the new value is only as long as the mask
    formattedValue = formattedValue.substring(0, this.maskPattern.length);

    // Update the input value and set cursor position
    if (inputElement.value !== formattedValue) {
      this.renderer.setProperty(inputElement, 'value', formattedValue);
      inputElement.setSelectionRange(newCursorPosition, newCursorPosition);
    }
  }

  /**
   * @description HostListener for 'paste' event. Applies mask formatting to pasted text.
   * @param event The native clipboard event.
   */
  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    event.preventDefault(); // Prevent default paste behavior
    if (!this.maskPattern) {
      return;
    }
    const pastedText = event.clipboardData ? event.clipboardData.getData('text/plain') : '';
    const currentInputValue = this.inputElement.value;

    // Temporarily set value to trigger the input event logic with the pasted text
    this.renderer.setProperty(this.inputElement, 'value', currentInputValue + pastedText);

    // Manually dispatch a generic 'Event' to trigger the onInput logic after paste
    // This avoids the stricter typing issues with InputEvent constructor properties.
    const syntheticEvent = new Event('input', { bubbles: true, cancelable: true });
    this.el.nativeElement.dispatchEvent(syntheticEvent);
  }
}