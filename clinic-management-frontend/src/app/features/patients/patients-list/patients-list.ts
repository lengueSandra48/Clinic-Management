import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject, debounceTime, distinctUntilChanged } from 'rxjs'; // For search and cleanup

@Component({
  selector: 'app-patients-list',
  standalone: false,
  templateUrl: './patients-list.html',
  styleUrl: './patients-list.scss'
})

export class PatientsList implements OnInit, OnDestroy {
  // --- Properties ---

  loading: boolean = true;
  patients: any[] = []; // Holds all patient data (simulated)
  filteredPatients: any[] = []; // Patients displayed after filtering/pagination
  searchTerm: string = ''; // Input for search filter
  private searchSubject = new Subject<string>(); // Subject for debouncing search input

  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 5; // How many patients per page
  totalPages: number = 1;
  totalPatients: number = 0; // Total count of patients (before pagination)

  private dataSubscription: Subscription | undefined; // For cleanup

  constructor() {
    console.log('PatientsListComponent: Constructor called');
  }

  // --- Lifecycle Hooks ---

  ngOnInit(): void {
    console.log('PatientsListComponent: ngOnInit called');
    this.fetchPatients(); // Load initial patient data

    // Set up debounced search input
    this.dataSubscription = this.searchSubject.pipe(
      debounceTime(300), // Wait for 300ms after last keystroke
      distinctUntilChanged() // Only emit if value is different from previous value
    ).subscribe(searchTerm => {
      this.applyFilter();
    });
  }

  ngOnDestroy(): void {
    console.log('PatientsListComponent: ngOnDestroy called');
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe(); // Clean up subscriptions
      console.log('PatientsListComponent: dataSubscription unsubscribed.');
    }
  }

  // --- Methods ---

  /**
   * Simulates fetching patient data from an API.
   * In a real app, this would use an HttpClient.
   */
  fetchPatients(): void {
    this.loading = true;
    console.log('PatientsListComponent: Fetching patient data...');

    // Simulate an API call with dummy data
    setTimeout(() => {
      // Dummy Patient Data
      const dummyPatients = [
        { id: 1, name: 'Alice Johnson', dob: '1985-03-10', gender: 'Female', status: 'Active' },
        { id: 2, name: 'Bob Williams', dob: '1990-07-22', gender: 'Male', status: 'Active' },
        { id: 3, name: 'Carol Davis', dob: '1978-01-05', gender: 'Female', status: 'Active' },
        { id: 4, name: 'David Brown', dob: '2001-11-30', gender: 'Male', status: 'Inactive' },
        { id: 5, name: 'Eve White', dob: '1995-04-18', gender: 'Female', status: 'Active' },
        { id: 6, name: 'Frank Green', dob: '1982-09-01', gender: 'Male', status: 'Active' },
        { id: 7, name: 'Grace Hall', dob: '1970-02-14', gender: 'Female', status: 'Active' },
        { id: 8, name: 'Henry King', dob: '1998-06-25', gender: 'Male', status: 'Inactive' },
        { id: 9, name: 'Ivy Lee', dob: '1965-12-03', gender: 'Female', status: 'Active' },
        { id: 10, name: 'Jack Moore', dob: '1992-08-08', gender: 'Male', status: 'Active'},
        { id: 11, name: 'Karen Taylor', dob: '1980-05-15', gender: 'Female', status: 'Active' },
        { id: 12, name: 'Liam Clark', dob: '2005-01-20', gender: 'Male', status: 'Active' },
        { id: 13, name: 'Mia Lewis', dob: '1975-09-09', gender: 'Female', status: 'Inactive' },
        { id: 14, name: 'Noah Wright', dob: '1988-03-28', gender: 'Male', status: 'Active' },
        { id: 15, name: 'Olivia Scott', dob: '1993-10-12', gender: 'Female', status: 'Active' },
        // Add more dummy patients here if needed
      ];

      this.patients = dummyPatients;
      this.totalPatients = dummyPatients.length;
      this.totalPages = Math.ceil(this.totalPatients / this.itemsPerPage);

      this.loading = false;
      this.applyFilter(); // Apply initial filter/pagination
      console.log('PatientsListComponent: Patient data fetched and filtered.');
    }, 1000); // Simulate 1 second loading time
  }

  /**
   * Applies the current search term and pagination to the patient list.
   */
  applyFilter(): void {
    let tempPatients = [...this.patients]; // Start with all patients

    // Apply search filter
    if (this.searchTerm) {
      const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
      tempPatients = tempPatients.filter(patient =>
        patient.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        patient.status.toLowerCase().includes(lowerCaseSearchTerm)
        // Add more fields to search as needed
      );
    }

    // Update total pages based on filtered results
    this.totalPatients = tempPatients.length;
    this.totalPages = Math.ceil(this.totalPatients / this.itemsPerPage);

    // Ensure current page is valid after filtering (e.g., if filter reduces total pages)
    if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = this.totalPages;
    } else if (this.totalPages === 0) {
      this.currentPage = 1; // Or handle as no data
    }


    // Apply pagination
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredPatients = tempPatients.slice(startIndex, endIndex);

    console.log(`Filtered patients: ${this.filteredPatients.length}, Current Page: ${this.currentPage}, Total Pages: ${this.totalPages}`);
  }

  /**
   * Handles page change events from the pagination component.
   * @param newPage The new page number requested.
   */
  onPageChange(newPage: number): void {
    if (newPage >= 1 && newPage <= this.totalPages && newPage !== this.currentPage) {
      this.currentPage = newPage;
      this.applyFilter(); // Re-apply filter to update pagination
      console.log('Navigating to page:', newPage);
    }
  }

  /**
   * Called when the search input value changes.
   * Uses a Subject to debounce the input, preventing too many filter calls.
   * @param event The input change event.
   */
  onSearchChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchSubject.next(inputElement.value);
  }

  /**
   * Simulates adding a new patient.
   * In a real app, this would navigate to a patient creation form.
   */
  onAddPatient(): void {
    console.log('PatientsListComponent: "Add New Patient" button clicked.');
    // Example: this.router.navigate(['/patients/new']);
    alert('Simulating navigation to Add Patient form!');
  }

  /**
   * Simulates viewing details of a specific patient.
   * @param patient The patient object to view.
   */
  onViewPatientDetails(patient: any): void {
    console.log('PatientsListComponent: Viewing details for patient:', patient.name);
    // Example: this.router.navigate(['/patients', patient.id]);
    alert(`Viewing details for ${patient.name} (ID: ${patient.id})`);
  }
}