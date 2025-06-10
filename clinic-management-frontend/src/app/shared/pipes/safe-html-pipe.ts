import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'; // Import DomSanitizer

/**
 * @description A pipe that marks a string as safe HTML, allowing Angular to render it
 * without sanitizing potentially dangerous HTML tags or attributes.
 *
 * @IMPORTANT Use this pipe only with HTML content that you trust completely.
 * Using it with untrusted input can lead to XSS vulnerabilities.
 *
 * @usage
 * `<div [innerHTML]="myTrustedHtmlString | appSafeHtml"></div>`
 *
 * @param value The HTML string to mark as safe.
 * @returns A `SafeHtml` object.
 */
@Pipe({
  name: 'appSafeHtml', // The name used in templates: {{ value | appSafeHtml }}
  standalone: false // This allows the pipe to be used without being declared in a module
})
export class SafeHtmlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {} // Inject DomSanitizer

  transform(value: string | null | undefined): SafeHtml {
    if (value === null || value === undefined) {
      return '';
    }
    // Bypass security and trust the given value to be safe HTML.
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}