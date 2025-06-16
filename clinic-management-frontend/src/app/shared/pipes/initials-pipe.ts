import { Pipe, PipeTransform } from '@angular/core';

/**
 * @description A pipe that extracts initials from a given full name string.
 * It takes the first letter of each word and converts it to uppercase.
 *
 * @usage
 * `{{ 'John Doe' | appInitials }}`           // Output: "JD"
 * `{{ 'Maria Luisa Garcia' | appInitials }}` // Output: "MLG"
 * `{{ 'single' | appInitials }}`             // Output: "S"
 *
 * @param value The full name string.
 * @returns A string containing the uppercase initials.
 */
@Pipe({
  name: 'appInitials', // The name used in templates: {{ value | appInitials }}
  standalone: false // This allows the pipe to be used without being declared in a module
})
export class InitialsPipe implements PipeTransform {

  transform(value: string | null | undefined): string {
    if (value === null || value === undefined || value.trim() === '') {
      return '';
    }

    const words = value.trim().split(/\s+/); // Split by one or more spaces
    let initials = '';

    for (const word of words) {
      if (word.length > 0) {
        initials += word[0].toUpperCase();
      }
    }

    return initials;
  }
}