import { Pipe, PipeTransform } from '@angular/core';

/**
 * @description A pipe that transforms a string to title case, where the first letter
 * of each word is capitalized.
 *
 * @usage
 * `{{ 'hello world' | appTitleCase }}`     // Output: "Hello World"
 * `{{ 'ANGULAR PIPE' | appTitleCase }}`    // Output: "Angular Pipe"
 *
 * @param value The string to transform.
 * @returns The string in title case.
 */
@Pipe({
  name: 'appTitleCase', // The name used in templates: {{ value | appTitleCase }}
  standalone: false // This allows the pipe to be used without being declared in a module
})
export class TitleCasePipe implements PipeTransform {

  transform(value: string | null | undefined): string {
    if (value === null || value === undefined || value.trim() === '') {
      return '';
    }

    return value.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
    });
  }
}