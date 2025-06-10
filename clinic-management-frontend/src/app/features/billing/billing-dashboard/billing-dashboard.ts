import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-billing-dashboard',
  standalone: false,
  templateUrl: './billing-dashboard.html',
  styleUrl: './billing-dashboard.scss'
})

export class BillingDashboard implements OnInit, OnDestroy {
  // --- Properties ---
  loading: boolean = true;
  outstandingInvoicesCount: number = 0;
  recentTransactions: any[] = []; // Array to hold recent transaction data

  private dataSubscription: Subscription | undefined; // For cleanup

  constructor() {
    console.log('BillingDashboardComponent: Constructor called');
  }

  // --- Lifecycle Hooks ---
  ngOnInit(): void {
    console.log('BillingDashboardComponent: ngOnInit called');
    this.fetchBillingData();
  }

  ngOnDestroy(): void {
    console.log('BillingDashboardComponent: ngOnDestroy called');
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe(); // Clean up subscriptions
      console.log('BillingDashboardComponent: dataSubscription unsubscribed.');
    }
  }

  // --- Methods ---

  /**
   * Simulates fetching billing summary data.
   */
  fetchBillingData(): void {
    this.loading = true;
    console.log('BillingDashboardComponent: Fetching billing data...');

    this.dataSubscription = new Subscription(); // Dummy subscription

    setTimeout(() => {
      this.outstandingInvoicesCount = 7;
      this.recentTransactions = [
        { id: 1, patient: 'Jane Doe', amount: 120.00, date: '2025-06-09' },
        { id: 2, patient: 'John Smith', amount: 75.50, date: '2025-06-08' },
        { id: 3, patient: 'Emily White', amount: 200.00, date: '2025-06-07' },
      ];
      this.loading = false;
      console.log('BillingDashboardComponent: Billing data fetched.');
    }, 1000); // Simulate 1 second loading time
  }

  /**
   * Handles the action when 'View Outstanding Invoices' button is clicked.
   */
  onViewInvoices(): void {
    console.log('BillingDashboardComponent: Navigating to outstanding invoices...');
    alert('Simulating navigation to Outstanding Invoices!');
  }

  /**
   * Handles the action when 'View All Transactions' button is clicked.
   */
  onViewTransactions(): void {
    console.log('BillingDashboardComponent: Navigating to all transactions...');
    alert('Simulating navigation to All Transactions!');
  }

  /**
   * Handles the action when 'Generate Invoice' button is clicked.
   */
  onGenerateInvoice(): void {
    console.log('BillingDashboardComponent: Navigating to generate invoice form...');
    alert('Simulating navigation to Generate New Invoice form!');
  }
}