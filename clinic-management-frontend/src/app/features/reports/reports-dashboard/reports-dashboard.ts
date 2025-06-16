import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reports-dashboard',
  standalone: false,
  templateUrl: './reports-dashboard.html',
  styleUrl: './reports-dashboard.scss'
})

export class ReportsDashboard implements OnInit, OnDestroy {
  // --- Properties ---
  loading: boolean = true;

  // Patient Statistics
  totalPatients: number = 0;
  newPatientsMonth: number = 0;

  // Financial Overview
  totalRevenueMonth: number = 0;
  outstandingInvoices: number = 0;

  // Appointment Trends
  appointmentsThisWeek: number = 0;
  averageDailyAppointments: number = 0;

  private dataSubscription: Subscription | undefined; // For cleanup

  constructor() {
    console.log('ReportsDashboardComponent: Constructor called');
  }

  // --- Lifecycle Hooks ---
  ngOnInit(): void {
    console.log('ReportsDashboardComponent: ngOnInit called');
    this.fetchReportSummaries(); // Load initial summary data
  }

  ngOnDestroy(): void {
    console.log('ReportsDashboardComponent: ngOnDestroy called');
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe(); // Clean up subscriptions
      console.log('ReportsDashboardComponent: dataSubscription unsubscribed.');
    }
  }

  // --- Methods ---

  /**
   * Simulates fetching summary data for various reports.
   */
  fetchReportSummaries(): void {
    this.loading = true;
    console.log('ReportsDashboardComponent: Fetching report summaries...');

    this.dataSubscription = new Subscription(); // Dummy subscription

    setTimeout(() => {
      // Simulate data for patient statistics
      this.totalPatients = 580;
      this.newPatientsMonth = 15;

      // Simulate data for financial overview
      this.totalRevenueMonth = 15234.75;
      this.outstandingInvoices = 28;

      // Simulate data for appointment trends
      this.appointmentsThisWeek = 45;
      this.averageDailyAppointments = this.appointmentsThisWeek / 7; // Simple average

      this.loading = false;
      console.log('ReportsDashboardComponent: Report summaries fetched.');
    }, 1100); // Simulate 1.1 seconds loading time
  }

  /**
   * Handles navigation to patient specific reports.
   */
  onViewPatientStats(): void {
    console.log('ReportsDashboardComponent: Viewing patient reports...');
    alert('Simulating navigation to detailed Patient Reports!');
    // Example: this.router.navigate(['/reports/patients']);
  }

  /**
   * Handles navigation to financial reports.
   */
  onViewFinancials(): void {
    console.log('ReportsDashboardComponent: Viewing financial reports...');
    alert('Simulating navigation to detailed Financial Reports!');
    // Example: this.router.navigate(['/reports/financial']);
  }

  /**
   * Handles navigation to appointment trend reports.
   */
  onViewAppointmentsTrend(): void {
    console.log('ReportsDashboardComponent: Viewing appointment trend reports...');
    alert('Simulating navigation to detailed Appointment Trend Reports!');
    // Example: this.router.navigate(['/reports/appointments']);
  }

  /**
   * Handles navigation to a general "all reports" page.
   */
  onViewOtherReports(): void {
    console.log('ReportsDashboardComponent: Viewing other reports...');
    alert('Simulating navigation to a comprehensive Reports Index!');
    // Example: this.router.navigate(['/reports/all']);
  }
}