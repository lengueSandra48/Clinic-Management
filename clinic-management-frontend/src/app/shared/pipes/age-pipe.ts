import { Pipe, PipeTransform } from '@angular/core';

/**
 * @description A pipe that calculates and displays a person's age from their birth date.
 * It can show age in years, or for infants, in months and days.
 *
 * @usage
 * `{{ patient.dateOfBirth | appAge }}`
 *
 * @param value The birth date (Date object, ISO string, or valid date string).
 * @returns A string representing the age (e.g., "35 years", "6 months", "3 days").
 */
@Pipe({
  name: 'appAge', // The name used in templates: {{ value | appAge }}
  standalone: false // This allows the pipe to be used without being declared in a module
})
export class AgePipe implements PipeTransform {

  transform(value: Date | string | null | undefined): string {
    if (!value) {
      return '';
    }

    const birthDate = new Date(value);
    const today = new Date();

    if (isNaN(birthDate.getTime())) { // Check for invalid date
      return 'Invalid Date';
    }

    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    // Adjust months and years if birth date hasn't occurred yet in current year/month
    if (ageDays < 0) {
      ageMonths--;
      ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate(); // Days in previous month
    }
    if (ageMonths < 0) {
      ageYears--;
      ageMonths += 12;
    }

    if (ageYears > 0) {
      return `${ageYears} year${ageYears === 1 ? '' : 's'}`;
    } else if (ageMonths > 0) {
      return `${ageMonths} month${ageMonths === 1 ? '' : 's'}`;
    } else {
      return `${ageDays} day${ageDays === 1 ? '' : 's'}`;
    }
  }
}