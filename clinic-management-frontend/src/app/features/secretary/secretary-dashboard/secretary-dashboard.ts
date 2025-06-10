import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs'; // Import Subscription for cleanup example
import { Router } from '@angular/router'; // You would import Router if you use it for navigation

@Component({
  selector: 'app-secretary-dashboard',
  standalone: false,
  templateUrl: './secretary-dashboard.html',
  styleUrl: './secretary-dashboard.scss'
})
export class SecretaryDashboard implements OnInit, OnDestroy {

  // --- Properties ---

  // 1. Loading state (common for data fetching)
  loading: boolean = true;

  // 2. Data summary properties (example data structures)
  appointmentsSummary: {
    pendingConfirmations: number;
    upcomingToday: number;
    totalPending: number;
  } = {
    pendingConfirmations: 0,
    upcomingToday: 0,
    totalPending: 0
  };

  billsSummary: {
    outstanding: number;
    dueToday: number;
    totalAmountDue: number; // e.g., total in currency
  } = {
    outstanding: 0,
    dueToday: 0,
    totalAmountDue: 0
  };

  // 3. A dummy subscription variable for demonstrating ngOnDestroy cleanup
  // In a real app, you'd manage actual service subscriptions here.
  private dataSubscription: Subscription | undefined;

  // Constructor: Used for dependency injection (e.g., injecting services like HttpClient, Router)
  // constructor(private router: Router /* Add other services here */) {
  constructor() {
    console.log('SecretaryDashboardComponent: Constructor called');
  }

  // --- Lifecycle Hooks ---

  /**
   * ngOnInit: Called once after the component's data-bound properties are initialized.
   * This is the preferred place for initial data retrieval or setup that doesn't rely
   * on input changes.
   */
  ngOnInit(): void {
    console.log('SecretaryDashboardComponent: ngOnInit called');
    this.fetchDashboardData(); // Call method to load data when component initializes
  }

  /**
   * ngOnDestroy: Called once just before the component is destroyed by Angular.
   * Use this for cleanup tasks, such as unsubscribing from observables to prevent
   * memory leaks, clearing timers, or detaching event listeners.
   */
  ngOnDestroy(): void {
    console.log('SecretaryDashboardComponent: ngOnDestroy called');
    // Ensure you unsubscribe from any long-lived observables here
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
      console.log('SecretaryDashboardComponent: dataSubscription unsubscribed.');
    }
    // Add other cleanup code here
  }

  // --- Methods ---

  /**
   * Simulates fetching dashboard summary data from a backend service.
   * In a real application, this would involve using HttpClient to make API calls.
   */
  fetchDashboardData(): void {
    this.loading = true; // Set loading to true while fetching
    console.log('SecretaryDashboardComponent: Fetching dashboard data...');

    // Simulate an asynchronous data fetch (e.g., an HTTP request)
    // In a real scenario, this would be: this.dataSubscription = this.yourService.getDashboardSummary().subscribe(...)
    this.dataSubscription = new Subscription(); // This is a dummy subscription for the example

    setTimeout(() => {
      // Simulate receiving data
      this.appointmentsSummary = {
        pendingConfirmations: 3,
        upcomingToday: 5,
        totalPending: 8
      };
      this.billsSummary = {
        outstanding: 5,
        dueToday: 2,
        totalAmountDue: 1250.75
      };
      this.loading = false; // Set loading to false once data is received
      console.log('SecretaryDashboardComponent: Dashboard data fetched.');
    }, 1500); // Simulate a 1.5 second loading delay
  }

  /**
   * Handles the action when the "View Appointments" button is clicked.
   * In a real application, this would typically navigate to the appointments list page.
   */
  onViewAppointments(): void {
    console.log('SecretaryDashboardComponent: "View Appointments" button clicked.');
    // Example: If using Angular Router:
    // this.router.navigate(['/secretary/appointments']);
    alert('Simulating navigation to Appointments list!');
  }

  /**
   * Handles the action when the "Manage Bills" button is clicked.
   * In a real application, this would typically navigate to the billing management page.
   */
  onManageBills(): void {
    console.log('SecretaryDashboardComponent: "Manage Bills" button clicked.');
    // Example: If using Angular Router:
    // this.router.navigate(['/secretary/bills']);
    alert('Simulating navigation to Billing Management!');
  }
}
