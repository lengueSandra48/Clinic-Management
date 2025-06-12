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
  loading: boolean = true;

  // Appointment Data
  todayAppointments: number = 0;
  weekAppointments: number = 0;

  // Billing Data
  unpaidBillsCount: number = 0;
  totalOutstandingAmount: number = 0;

  private dataSubscription: Subscription | undefined;

  constructor(private router: Router) { // Inject Router
    console.log('SecretaryDashboardComponent: Constructor called');
  }

  ngOnInit(): void {
    console.log('SecretaryDashboardComponent: ngOnInit called');
    this.fetchSecretarySummaryData();
  }

  ngOnDestroy(): void {
    console.log('SecretaryDashboardComponent: ngOnDestroy called');
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
      console.log('SecretaryDashboardComponent: dataSubscription unsubscribed.');
    }
  }

  /**
   * Simulates fetching summary data for the secretary dashboard.
   */
  fetchSecretarySummaryData(): void {
    this.loading = true;
    console.log('SecretaryDashboardComponent: Fetching summary data...');

    // Simulate API call
    this.dataSubscription = new Subscription(); // Dummy subscription
    setTimeout(() => {
      // Dummy data for Appointments
      this.todayAppointments = 5;
      this.weekAppointments = 28;

      // Dummy data for Billing
      this.unpaidBillsCount = 12;
      this.totalOutstandingAmount = 3560.50;

      this.loading = false;
      console.log('SecretaryDashboardComponent: Summary data fetched.');
    }, 900); // Simulate 0.9 second loading time
  }

  // --- Appointment Management Actions ---

  onAddNewAppointment(): void {
    console.log('Add New Appointment clicked');
    // Navigate to the appointment creation page/form within the Appointment module
    this.router.navigate(['/appointment', 'new']); // Assuming '/appointment/new' route
    alert('Navigating to Add New Appointment form.');
  }

  onViewAllAppointments(): void {
    console.log('View All Appointments clicked');
    // Navigate to the main appointments list page within the Appointment module
    this.router.navigate(['/appointment']);
    alert('Navigating to All Appointments list.');
  }

  // --- Billing & Payment Actions ---

  onCreateNewBill(): void {
    console.log('Create New Bill clicked');
    // Navigate to the bill creation page/form within the Billing module
    this.router.navigate(['/billing', 'new']); // Assuming '/billing/new' route
    alert('Navigating to Create New Bill form.');
  }

  onTrackUnpaidBills(): void {
    console.log('Track Unpaid Bills clicked');
    // Navigate to the billing list page, possibly with a filter for unpaid bills
    this.router.navigate(['/billing'], { queryParams: { status: 'unpaid' } });
    alert('Navigating to Bills list, filtered by Unpaid.');
  }

  onViewAllBills(): void {
    console.log('View All Bills clicked');
    // Navigate to the main billing list page within the Billing module
    this.router.navigate(['/billing']);
    alert('Navigating to All Bills list.');
  }

  // --- Other Secretary Tasks (Placeholder Actions) ---

  onRegisterNewPatient(): void {
    console.log('Register New Patient clicked');
    this.router.navigate(['/patients', 'new']); // Assuming '/patients/new' route
    alert('Navigating to Register New Patient form.');
  }

  onViewPatientRecords(): void {
    console.log('View Patient Records clicked');
    this.router.navigate(['/patients']); // Navigate to patient list
    alert('Navigating to Patient Records list.');
  }

  onManageMessages(): void {
    console.log('Manage Messages clicked');
    alert('Simulating navigation to a Messaging/Communication module.');
    // If you had a 'communication' module, you'd navigate there: this.router.navigate(['/communication']);
  }
}