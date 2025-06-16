import { Pipe, PipeTransform } from '@angular/core';

/**
 * @description A pipe that truncates a string to a specified length, adding an ellipsis if truncated.
 *
 * @usage
 * `{{ 'This is a very long text.' | appTruncate:10 }}`  // Output: "This is a..."
 * `{{ 'Short text.' | appTruncate:20:' !!!' }}`         // Output: "Short text."
 *
 * @param value The string to truncate.
 * @param limit The maximum length of the string before truncation. Defaults to 50.
 * @param ellipsis The string to append if truncated. Defaults to '...'.
 * @returns The truncated string.
 */
@Pipe({
  name: 'appTruncate', // The name used in templates: {{ value | appTruncate }}
  standalone: false // This allows the pipe to be used without being declared in a module
})
export class TruncatePipe implements PipeTransform {

  transform(value: string | null | undefined, limit: number = 50, ellipsis: string = '...'): string {
    if (value === null || value === undefined) {
      return '';
    }

    // Ensure value is a string
    const stringValue = String(value);

    if (stringValue.length <= limit) {
      return stringValue;
    }

    return stringValue.substring(0, limit) + ellipsis;
  }
}