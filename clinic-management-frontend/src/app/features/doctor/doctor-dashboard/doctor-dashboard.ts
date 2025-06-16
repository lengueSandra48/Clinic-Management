import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'; // Import Router for navigation
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-doctor-dashboard',
  standalone: false,
  templateUrl: './doctor-dashboard.html',
  styleUrl: './doctor-dashboard.scss'
})

export class DoctorDashboard implements OnInit, OnDestroy {
  loading: boolean = true;
  doctorName: string = 'John Doe'; // Replace with actual doctor name from authentication
  searchPatientId: number | null = null; // For direct patient search

  // Patient Data
  totalPatients: number = 0;
  patientsSeenToday: number = 0;

  // Appointment Data
  appointmentsToday: number = 0;
  appointmentsThisWeek: number = 0;

  // Prescription & Lab Data
  prescriptionsToday: number = 0;
  pendingLabResults: number = 0;

  private dataSubscription: Subscription | undefined;

  constructor(private router: Router) { // Inject Router
    console.log('DoctorDashboardComponent: Constructor called');
  }

  ngOnInit(): void {
    console.log('DoctorDashboardComponent: ngOnInit called');
    this.fetchDoctorSummaryData();
  }

  ngOnDestroy(): void {
    console.log('DoctorDashboardComponent: ngOnDestroy called');
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
      console.log('DoctorDashboardComponent: dataSubscription unsubscribed.');
    }
  }

  /**
   * Simulates fetching summary data for the doctor dashboard.
   */
  fetchDoctorSummaryData(): void {
    this.loading = true;
    console.log('DoctorDashboardComponent: Fetching summary data...');

    // Simulate API call
    this.dataSubscription = new Subscription(); // Dummy subscription
    setTimeout(() => {
      // Dummy data for Patient Management
      this.totalPatients = 580;
      this.patientsSeenToday = 3;

      // Dummy data for Appointments
      this.appointmentsToday = 5;
      this.appointmentsThisWeek = 28;

      // Dummy data for Prescriptions & Lab Results
      this.prescriptionsToday = 4;
      this.pendingLabResults = 7;

      this.loading = false;
      console.log('DoctorDashboardComponent: Summary data fetched.');
    }, 900); // Simulate 0.9 second loading time
  }

  // --- Patient Management Actions ---

  onAddNewPatient(): void {
    console.log('Register New Patient clicked');
    this.router.navigate(['/patients', 'new']); // Navigate to the new patient form
    alert('Navigating to Register New Patient form.');
  }

  onViewAllPatients(): void {
    console.log('View All Patients clicked');
    this.router.navigate(['/patients']); // Navigate to the patient list
    alert('Navigating to All Patients list.');
  }

  onSearchPatient(): void {
    if (this.searchPatientId) {
      console.log(`Searching for patient with ID: ${this.searchPatientId}`);
      this.router.navigate(['/patients', this.searchPatientId]); // Navigate to patient detail
      alert(`Navigating to patient file for ID: ${this.searchPatientId}.`);
    } else {
      alert('Please enter a Patient ID to search.');
    }
  }

  // --- Appointment Actions ---

  onViewMyAppointments(): void {
    console.log('View My Schedule clicked');
    this.router.navigate(['/appointment'], { queryParams: { doctor: this.doctorName } }); // Filter appointments by current doctor
    alert('Navigating to My Schedule (Appointments).');
  }

  onManageAppointments(): void {
    console.log('Manage Appointments clicked');
    this.router.navigate(['/appointment']); // Navigate to main appointment management
    alert('Navigating to general Appointment Management.');
  }

  // --- Prescriptions & Lab Results Actions ---

  onWritePrescription(): void {
    console.log('Write Prescription clicked');
    this.router.navigate(['/prescription', 'new']); // Assuming a '/prescription/new' route
    alert('Navigating to Write New Prescription form.');
  }

  onViewLabResults(): void {
    console.log('View Lab Results clicked');
    this.router.navigate(['/lab-results']); // Assuming you'll add a '/lab-results' module
    alert('Navigating to Lab Results for review.');
  }
}