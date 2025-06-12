import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-patient-form',
  standalone: false,
  templateUrl: './patient-form.html',
  styleUrl: './patient-form.scss'
})

export class PatientForm implements OnInit, OnDestroy {
  patientForm!: FormGroup;
  isEditMode: boolean = false;
  patientId: number | null = null;
  loading: boolean = true;
  private dataSubscription: Subscription | undefined;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log('PatientFormComponent: ngOnInit called');
    this.initForm();

    this.dataSubscription = this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.patientId = +id;
        this.loadPatientData(this.patientId); // Load data for editing
      } else {
        this.isEditMode = false;
        this.loading = false; // No loading needed for new patient form
      }
    });
  }

  ngOnDestroy(): void {
    console.log('PatientFormComponent: ngOnDestroy called');
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
      console.log('PatientFormComponent: dataSubscription unsubscribed.');
    }
  }

  // Helper to get form controls easily in the template
  get f(): { [key: string]: AbstractControl } {
    return this.patientForm.controls;
  }

  initForm(): void {
    this.patientForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      dateOfBirth: ['', [Validators.required, this.pastDateValidator]],
      gender: ['', Validators.required],
      address: [''],
      phone: ['', [Validators.required, Validators.pattern(/^\+?\d{9,15}$/)]], // Basic phone number regex
      email: ['', Validators.email],
      medicalHistory: [''],
      allergies: [''],
      currentMedications: ['']
    });
  }

  // Custom validator for past dates
  pastDateValidator(control: AbstractControl): ValidationErrors | null {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Ignore time for comparison
    if (selectedDate > today) {
      return { pastDate: true };
    }
    return null;
  }


  loadPatientData(id: number): void {
    this.loading = true;
    console.log(`PatientFormComponent: Loading patient data for ID: ${id}`);
    // Simulate API call to fetch patient data
    setTimeout(() => {
      const dummyPatient = {
        id: id,
        firstName: 'Alice',
        lastName: 'Wonderland',
        dateOfBirth: '1990-05-15',
        gender: 'Female',
        address: '123 Rabbit Hole',
        phone: '+1234567890',
        email: 'alice@wonder.com',
        medicalHistory: 'Chronic curiosity, occasional size changes',
        allergies: 'Mushrooms (some types), strict logic',
        currentMedications: 'None'
      };

      if (dummyPatient.id === id) { // Simulate finding the patient
        this.patientForm.patchValue(dummyPatient);
        this.loading = false;
        console.log('PatientFormComponent: Patient data loaded.');
      } else {
        alert('Patient not found!');
        this.router.navigate(['/patients']); // Redirect if not found
        this.loading = false;
      }
    }, 1000);
  }

  onSubmit(): void {
    if (this.patientForm.invalid) {
      this.patientForm.markAllAsTouched(); // Mark all fields as touched to show validation errors
      console.log('PatientForm: Form is invalid.', this.patientForm.value);
      alert('Please fill in all required fields and correct errors.');
      return;
    }

    this.loading = true;
    const patientData = this.patientForm.value;
    console.log('PatientForm: Submitting data:', patientData);

    // Simulate API call for create/update
    setTimeout(() => {
      if (this.isEditMode) {
        console.log(`PatientForm: Simulating update for Patient ID: ${this.patientId}`, patientData);
        alert(`Patient ${patientData.firstName} ${patientData.lastName} (ID: ${this.patientId}) updated successfully!`);
      } else {
        const newId = Math.floor(Math.random() * 1000) + 100; // Simulate new ID
        console.log('PatientForm: Simulating creation of new patient', patientData);
        alert(`New patient ${patientData.firstName} ${patientData.lastName} (ID: ${newId}) registered successfully!`);
      }
      this.loading = false;
      this.router.navigate(['/patients']); // Redirect to patient list after submission
    }, 1200);
  }

  onCancel(): void {
    console.log('PatientForm: Form cancelled.');
    if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
      this.router.navigate(['/patients']); // Go back to patient list
    }
  }
}