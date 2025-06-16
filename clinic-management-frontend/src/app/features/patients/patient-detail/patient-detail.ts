import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-patient-detail',
  standalone: false,
  templateUrl: './patient-detail.html',
  styleUrl: './patient-detail.scss'
})

export class PatientDetail implements OnInit, OnDestroy {
  patient: any | null = null;
  loading: boolean = true;
  private paramSubscription: Subscription | undefined;
  private dataSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log('PatientDetailComponent: ngOnInit called');
    this.paramSubscription = this.route.paramMap.subscribe(params => {
      const patientId = params.get('id');
      if (patientId) {
        this.loadPatientDetails(+patientId);
      } else {
        console.warn('Patient ID not found in route parameters.');
        this.loading = false;
        this.patient = null; // No patient ID means no patient to load
      }
    });
  }

  ngOnDestroy(): void {
    console.log('PatientDetailComponent: ngOnDestroy called');
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
      console.log('PatientDetailComponent: paramSubscription unsubscribed.');
    }
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
      console.log('PatientDetailComponent: dataSubscription unsubscribed.');
    }
  }

  loadPatientDetails(id: number): void {
    this.loading = true;
    this.patient = null; // Clear previous patient data
    console.log(`PatientDetailComponent: Loading details for patient ID: ${id}`);

    // Simulate API call to fetch patient data
    this.dataSubscription = new Subscription(); // Dummy subscription
    setTimeout(() => {
      // Dummy Patient Data - in a real app, this would come from a backend API
      const dummyPatient = {
        id: id,
        firstName: 'Alice',
        lastName: 'Wonderland',
        dateOfBirth: '1990-05-15',
        gender: 'Female',
        address: '123 Rabbit Hole, Fictional City, FA 98765',
        phone: '+237 670123456',
        email: 'alice@wonder.com',
        medicalHistory: 'Chronic curiosity, occasional uncontrolled growth/shrinking episodes, mild tea party addiction.',
        allergies: 'Mushrooms (some varieties), strict logic, tardiness.',
        currentMedications: 'None.',
        // Example nested data for history
        appointments: [
          { id: 101, date: '2024-03-01', type: 'General Checkup', doctor: 'Smith' },
          { id: 102, date: '2023-11-20', type: 'Follow-up', doctor: 'Smith' },
          { id: 103, date: '2023-08-05', type: 'Emergency Visit (Falling)', doctor: 'Jones' }
        ],
        prescriptions: [
          { id: 201, date: '2024-03-01', medication: 'Curiosity Suppressant', dosage: '10mg daily' },
          { id: 202, date: '2023-11-20', medication: 'Growth Enhancer', dosage: 'as needed' }
        ],
        labResults: [
          { id: 301, date: '2024-02-28', testName: 'Blood Count', status: 'Normal' },
          { id: 302, date: '2023-11-18', testName: 'Mushroom Toxicity Screen', status: 'Negative' }
        ]
      };

      if (dummyPatient.id === id) { // Simulate finding the patient
        this.patient = dummyPatient;
        this.loading = false;
        console.log('PatientDetailComponent: Patient details loaded.');
      } else {
        console.error('Patient not found with ID:', id);
        this.loading = false;
        this.patient = null;
      }
    }, 1000); // Simulate network delay
  }

  onEditPatient(): void {
    console.log(`Edit Patient clicked for ID: ${this.patient?.id}`);
    if (this.patient?.id) {
      this.router.navigate(['/patients', 'edit', this.patient.id]);
    }
  }

  onNewAppointment(): void {
    console.log(`New Appointment clicked for Patient: ${this.patient?.firstName}`);
    // Navigate to appointment creation, pre-filling patient info if possible
    this.router.navigate(['/appointment', 'new'], { queryParams: { patientId: this.patient?.id } });
  }

  // --- Navigation for nested history items ---

  onViewAllAppointmentsForPatient(): void {
    console.log(`Viewing all appointments for Patient ID: ${this.patient?.id}`);
    this.router.navigate(['/appointment'], { queryParams: { patientId: this.patient?.id } });
  }

  onViewAppointmentDetail(appointmentId: number): void {
    console.log(`Viewing appointment detail for ID: ${appointmentId}`);
    this.router.navigate(['/appointment', appointmentId]); // Assuming '/appointment/:id' route
  }

  onViewAllPrescriptionsForPatient(): void {
    console.log(`Viewing all prescriptions for Patient ID: ${this.patient?.id}`);
    this.router.navigate(['/prescription'], { queryParams: { patientId: this.patient?.id } });
  }

  onViewPrescriptionDetail(prescriptionId: number): void {
    console.log(`Viewing prescription detail for ID: ${prescriptionId}`);
    this.router.navigate(['/prescription', prescriptionId]); // Assuming '/prescription/:id' route
  }

  onViewAllLabResultsForPatient(): void {
    console.log(`Viewing all lab results for Patient ID: ${this.patient?.id}`);
    this.router.navigate(['/lab-results'], { queryParams: { patientId: this.patient?.id } });
  }

  onViewLabResultDetail(resultId: number): void {
    console.log(`Viewing lab result detail for ID: ${resultId}`);
    this.router.navigate(['/lab-results', resultId]); // Assuming '/lab-results/:id' route (if you implement this module later)
  }
}