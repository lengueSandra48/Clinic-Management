import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss'
})

export class AdminDashboard implements OnInit, OnDestroy {
 // --- Properties ---
  loading: boolean = true;

  // User Management Summaries
  totalUsers: number = 0;
  newUsersMonth: number = 0;

  // Role Management Summaries
  totalRoles: number = 0;

  // System Settings Summaries
  lastSettingsUpdate: string = '';

  // Audit Logs Summaries
  criticalEvents: number = 0;

  private dataSubscription: Subscription | undefined; // Used for cleaning up subscriptions

  // If you were to use programmatic navigation, you'd inject Router here:
  // constructor(private router: Router) {
  constructor() {
    console.log('AdminDashboardComponent: Constructor called');
  }

  // --- Lifecycle Hooks ---

  /**
   * Called once, after the component is initialized.
   * This is a good place to fetch initial data.
   */
  ngOnInit(): void {
    console.log('AdminDashboardComponent: ngOnInit called');
    this.fetchAdminSummaries(); // Start fetching summary data
  }

  /**
   * Called once, before the component is destroyed.
   * Use this to unsubscribe from observables and clean up resources.
   */
  ngOnDestroy(): void {
    console.log('AdminDashboardComponent: ngOnDestroy called');
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe(); // Ensure all subscriptions are cleaned up
      console.log('AdminDashboardComponent: dataSubscription unsubscribed.');
    }
  }

  // --- Methods ---

  /**
   * Simulates fetching summary data for various administrative sections.
   * In a real application, this would involve making HTTP requests to a backend API.
   */
  fetchAdminSummaries(): void {
    this.loading = true;
    console.log('AdminDashboardComponent: Fetching admin summaries...');

    // A dummy subscription to simulate an observable, for ngOnDestroy demonstration
    this.dataSubscription = new Subscription();

    setTimeout(() => {
      // Dummy data for user management section
      this.totalUsers = 15; // Represents total number of clinic users (doctors, secretaries, etc.)
      this.newUsersMonth = 2; // New users added in the current month

      // Dummy data for role management section
      this.totalRoles = 5; // e.g., Admin, Doctor, Secretary, Nurse, Patient

      // Dummy data for system settings section
      this.lastSettingsUpdate = '2025-06-05 14:30'; // Last time system settings were modified

      // Dummy data for audit logs section
      this.criticalEvents = 1; // Number of critical events recorded in audit logs

      this.loading = false; // Set loading to false once data is "fetched"
      console.log('AdminDashboardComponent: Admin summaries fetched.');
    }, 1200); // Simulate a network delay of 1.2 seconds
  }

  /**
   * Handles the action when the "Manage Users" button is clicked.
   * Navigation is typically handled by `routerLink` in the HTML template.
   * This method remains for potential programmatic logic or console logging.
   */
  onManageUsers(): void {
    console.log('AdminDashboardComponent: Navigating to User Management...');
    // If you needed programmatic navigation (e.g., based on some condition):
    // this.router.navigate(['/admin/users']);
  }

  /**
   * Handles the action when the "Manage Roles" button is clicked.
   */
  onManageRoles(): void {
    console.log('AdminDashboardComponent: Navigating to Role & Permissions...');
    // this.router.navigate(['/admin/roles']);
  }

  /**
   * Handles the action when the "Configure Settings" button is clicked.
   */
  onSystemSettings(): void {
    console.log('AdminDashboardComponent: Navigating to System Settings...');
    // this.router.navigate(['/admin/settings']);
  }

  /**
   * Handles the action when the "View Audit Logs" button is clicked.
   */
  onViewAuditLogs(): void {
    console.log('AdminDashboardComponent: Navigating to Audit Logs...');
    // this.router.navigate(['/admin/audit-logs']);
  }
}