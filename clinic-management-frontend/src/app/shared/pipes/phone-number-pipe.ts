import { Pipe, PipeTransform } from '@angular/core';

/**
 * @description A pipe that formats a 10-digit phone number string into a readable format.
 * Currently formats to (XXX) XXX-XXXX.
 *
 * @usage
 * `{{ patient.phoneNumber | appPhoneNumber }}`
 *
 * @param value The raw phone number string (e.g., "1234567890").
 * @returns The formatted phone number string or the original value if unable to format.
 */
@Pipe({
  name: 'appPhoneNumber', // The name used in templates: {{ value | appPhoneNumber }}
  standalone: false // This allows the pipe to be used without being declared in a module
})
export class PhoneNumberPipe implements PipeTransform {

  transform(value: string | number | null | undefined): string {
    if (value === null || value === undefined) {
      return '';
    }

    // Convert to string and remove all non-digit characters
    const cleanValue = String(value).replace(/\D/g, '');

    // Only format if it's a 10-digit number
    if (cleanValue.length === 10) {
      const areaCode = cleanValue.substring(0, 3);
      const firstThree = cleanValue.substring(3, 6);
      const lastFour = cleanValue.substring(6, 10);
      return `(${areaCode}) ${firstThree}-${lastFour}`;
    }

    // Return the original clean value if not a 10-digit number
    return cleanValue;
  }
}