import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-prescription-list',
  standalone: false,
  templateUrl: './prescription-list.html',
  styleUrl: './prescription-list.scss'
})

export class PrescriptionList implements OnInit, OnDestroy {
  // --- Properties ---
  loading: boolean = true;
  prescriptions: any[] = []; // Holds prescription data

  private dataSubscription: Subscription | undefined; // For cleanup

  constructor() {
    console.log('PrescriptionListComponent: Constructor called');
  }

  // --- Lifecycle Hooks ---
  ngOnInit(): void {
    console.log('PrescriptionListComponent: ngOnInit called');
    this.fetchPrescriptions(); // Load initial prescription data
  }

  ngOnDestroy(): void {
    console.log('PrescriptionListComponent: ngOnDestroy called');
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe(); // Clean up subscriptions
      console.log('PrescriptionListComponent: dataSubscription unsubscribed.');
    }
  }

  // --- Methods ---

  /**
   * Simulates fetching prescription data from an API.
   */
  fetchPrescriptions(): void {
    this.loading = true;
    console.log('PrescriptionListComponent: Fetching prescription data...');

    // Simulate an API call with dummy data
    this.dataSubscription = new Subscription(); // Dummy subscription

    setTimeout(() => {
      // Dummy Prescription Data
      this.prescriptions = [
        { id: 101, patient: 'Alice Johnson', doctor: 'Dr. Smith', dateIssued: '2025-06-01', medications: ['Amoxicillin', 'Ibuprofen'] },
        { id: 102, patient: 'Bob Williams', doctor: 'Dr. Jones', dateIssued: '2025-05-28', medications: ['Lisinopril', 'Hydrochlorothiazide'] },
        { id: 103, patient: 'Carol Davis', doctor: 'Dr. Smith', dateIssued: '2025-06-05', medications: ['Metformin'] },
      ];

      this.loading = false;
      console.log('PrescriptionListComponent: Prescription data fetched.');
    }, 900); // Simulate 0.9 second loading time
  }

  /**
   * Simulates viewing details of a specific prescription.
   * @param prescription The prescription object to view.
   */
  onViewDetails(prescription: any): void {
    console.log('PrescriptionListComponent: Viewing details for prescription:', prescription.id);
    alert(`Viewing details for Prescription ID: ${prescription.id}`);
    // Example: this.router.navigate(['/prescription', prescription.id]);
  }

  /**
   * Simulates adding a new prescription.
   */
  onAddPrescription(): void {
    console.log('PrescriptionListComponent: "Add New Prescription" button clicked.');
    alert('Simulating navigation to Add New Prescription form!');
    // Example: this.router.navigate(['/prescription/new']);
  }
}