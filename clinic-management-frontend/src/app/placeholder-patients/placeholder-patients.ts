import { Component } from '@angular/core';

@Component({
  selector: 'app-placeholder-patients',
  standalone: false,
  templateUrl: './placeholder-patients.html',
  styleUrl: './placeholder-patients.scss'
})
export class PlaceholderPatients {
  // Dummy method to satisfy the pagination component's output
  onPageChange(page: number): void {
    console.log('Navigating to page:', page);
    // In a real app, you would fetch data for this page
  }
}
