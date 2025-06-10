import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: false,
  templateUrl: './doctor-dashboard.html',
  styleUrl: './doctor-dashboard.scss'
})

export class DoctorDashboard implements OnInit, OnDestroy {
  // --- Properties ---
  loading: boolean = true;
  upcomingAppointmentsCount: number = 0;
  newLabResultsCount: number = 0;
  activePatientsCount: number = 0;

  private dataSubscription: Subscription | undefined; // For cleanup

  constructor() {
    console.log('DoctorDashboardComponent: Constructor called');
  }

  // --- Lifecycle Hooks ---
  ngOnInit(): void {
    console.log('DoctorDashboardComponent: ngOnInit called');
    this.fetchDashboardData();
  }

  ngOnDestroy(): void {
    console.log('DoctorDashboardComponent: ngOnDestroy called');
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe(); // Clean up subscriptions
      console.log('DoctorDashboardComponent: dataSubscription unsubscribed.');
    }
  }

  // --- Methods ---

  /**
   * Simulates fetching doctor dashboard summary data.
   */
  fetchDashboardData(): void {
    this.loading = true;
    console.log('DoctorDashboardComponent: Fetching doctor dashboard data...');

    this.dataSubscription = new Subscription(); // Dummy subscription

    setTimeout(() => {
      this.upcomingAppointmentsCount = 3;
      this.newLabResultsCount = 5;
      this.activePatientsCount = 120;
      this.loading = false;
      console.log('DoctorDashboardComponent: Doctor dashboard data fetched.');
    }, 1200); // Simulate 1.2 seconds loading time
  }

  /**
   * Handles the action when 'View Today\'s Schedule' button is clicked.
   * In a real app, this would navigate to the doctor's appointment calendar.
   */
  onViewAppointments(): void {
    console.log('DoctorDashboardComponent: Navigating to appointments schedule...');
    alert('Simulating navigation to Doctor\'s Appointments!');
  }

  /**
   * Handles the action when 'Review Results' button is clicked.
   * In a real app, this would navigate to the lab results review page.
   */
  onReviewLabResults(): void {
    console.log('DoctorDashboardComponent: Navigating to lab results review...');
    alert('Simulating navigation to Lab Results Review!');
  }

  /**
   * Handles the action when 'View My Patients' button is clicked.
   * In a real app, this would navigate to a list of patients assigned to this doctor.
   */
  onViewMyPatients(): void {
    console.log('DoctorDashboardComponent: Navigating to my patients list...');
    alert('Simulating navigation to My Patients List!');
  }
}