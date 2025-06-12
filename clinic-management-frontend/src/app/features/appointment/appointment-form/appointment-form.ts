import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common'; // To format dates for default values

// Assuming ClinicEvent is defined as before, or you can define it here if not shared
interface ClinicEvent {
  id?: string; // Optional for new appointments
  title: string;
  start: string; // ISO string
  end: string;   // ISO string
  allDay?: boolean;
  doctor: string;
  room: string;
  patientName?: string; // Add patient name for form clarity
  notes?: string;
  color?: string;
}

@Component({
  selector: 'app-appointment-form',
  standalone: false, // Set to true if using standalone components
  templateUrl: './appointment-form.html',
  styleUrls: ['./appointment-form.scss'],
  providers: [DatePipe] // Provide DatePipe here if not globally available
})

export class AppointmentForm implements OnInit {
  appointmentForm!: FormGroup;
  isEditMode: boolean = false;
  loading: boolean = false;
  appointmentId: string | null = null; // Store current appointment ID if in edit mode

  // Dummy data for dropdowns
  patients: { id: number, name: string }[] = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Roe' },
    { id: 3, name: 'Patient X' },
    { id: 4, name: 'Mr. Green' },
    { id: 5, name: 'Ms. Blue' }
  ];
  doctors: { id: number, name: string }[] = [
    { id: 1, name: 'Dr. Smith' },
    { id: 2, name: 'Dr. Jones' },
    { id: 3, name: 'Dr. Lee' }
  ];
  rooms: string[] = ['Room 101', 'Room 102', 'Operating Room'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe // Inject DatePipe
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.route.paramMap.subscribe(params => {
      this.appointmentId = params.get('id');
      this.isEditMode = !!this.appointmentId;
      if (this.isEditMode) {
        this.loadAppointmentData(this.appointmentId!);
      }
    });
  }

  initForm(): void {
    const now = new Date();
    const formattedDate = this.datePipe.transform(now, 'yyyy-MM-dd');
    const formattedTime = this.datePipe.transform(now, 'HH:mm');

    this.appointmentForm = this.fb.group({
      patientName: ['', Validators.required],
      doctor: ['', Validators.required],
      room: ['', Validators.required],
      startDate: [formattedDate, Validators.required],
      startTime: [formattedTime, Validators.required],
      endDate: [formattedDate, Validators.required],
      endTime: [this.datePipe.transform(this.addHours(now, 1), 'HH:mm'), Validators.required], // Default end 1 hour later
      notes: ['']
    }, { validators: this.dateTimeValidator }); // Add custom validator for start/end
  }

  loadAppointmentData(id: string): void {
    this.loading = true;
    console.log(`Loading appointment data for ID: ${id}`);

    // Simulate fetching data from a backend
    setTimeout(() => {
      // Find the dummy appointment (this would be an API call in real app)
      const dummyAppointments: ClinicEvent[] = [
        { id: '1', title: 'John Doe - Checkup', start: this.formatDate(new Date(), 9, 0), end: this.formatDate(new Date(), 9, 30), doctor: 'Dr. Smith', room: 'Room 101', patientName: 'John Doe', notes: 'Routine checkup' },
        { id: '2', title: 'Jane Roe - Follow-up', start: this.formatDate(new Date(), 10, 0), end: this.formatDate(new Date(), 10, 45), doctor: 'Dr. Jones', room: 'Room 102', patientName: 'Jane Roe', notes: 'Follow-up on recent labs' },
        { id: '3', title: 'Patient X - New Patient', start: this.formatDate(new Date(), 14, 0), end: this.formatDate(new Date(), 15, 0), doctor: 'Dr. Smith', room: 'Room 101', patientName: 'Patient X', notes: 'First visit, general consultation' },
        { id: '4', title: 'Surgery - Mr. Green', start: this.formatDate(this.addDays(new Date(), 1), 9, 0), end: this.formatDate(this.addDays(new Date(), 1), 11, 0), doctor: 'Dr. Lee', room: 'Operating Room', patientName: 'Mr. Green', notes: 'Appendectomy' },
        { id: '5', title: 'Medical Exam - Ms. Blue', start: this.formatDate(this.addDays(new Date(), 1), 11, 30), end: this.formatDate(this.addDays(new Date(), 1), 12, 15), doctor: 'Dr. Smith', room: 'Room 101', patientName: 'Ms. Blue', notes: 'Annual medical exam' },
      ];
      const appointment = dummyAppointments.find(a => a.id === id);

      if (appointment) {
        // Parse dates for form controls
        const startDate = this.datePipe.transform(appointment.start, 'yyyy-MM-dd');
        const startTime = this.datePipe.transform(appointment.start, 'HH:mm');
        const endDate = this.datePipe.transform(appointment.end, 'yyyy-MM-dd');
        const endTime = this.datePipe.transform(appointment.end, 'HH:mm');

        this.appointmentForm.patchValue({
          patientName: appointment.patientName,
          doctor: appointment.doctor,
          room: appointment.room,
          startDate: startDate,
          startTime: startTime,
          endDate: endDate,
          endTime: endTime,
          notes: appointment.notes
        });
        console.log('Appointment data loaded:', appointment);
      } else {
        console.warn(`Appointment with ID ${id} not found.`);
        this.router.navigate(['/appointment/calendar']); // Redirect if not found
      }
      this.loading = false;
    }, 500);
  }

  // Helper to format date + time into ISO string
  private formatDate(date: Date, hours: number, minutes: number = 0): string {
    const d = new Date(date);
    d.setHours(hours, minutes, 0, 0);
    return d.toISOString();
  }

  // Helper to add days to a date
  private addDays(date: Date, days: number): Date {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
  }

  // Helper to add hours to a date
  private addHours(date: Date, hours: number, minutes: number = 0): Date {
    const d = new Date(date);
    d.setHours(d.getHours() + hours, d.getMinutes() + minutes, 0, 0);
    return d;
  }


  // Custom validator for start/end date-time
  dateTimeValidator(formGroup: FormGroup): { [key: string]: boolean } | null {
    const startDateTime = new Date(`${formGroup.get('startDate')?.value}T${formGroup.get('startTime')?.value}`);
    const endDateTime = new Date(`${formGroup.get('endDate')?.value}T${formGroup.get('endTime')?.value}`);

    if (startDateTime && endDateTime && startDateTime >= endDateTime) {
      return { 'invalidDateTimeRange': true };
    }
    return null;
  }

  // Getter for easy access to form controls in the template
  get f(): { [key: string]: AbstractControl } {
    return this.appointmentForm.controls;
  }

  onSubmit(): void {
    if (this.appointmentForm.invalid) {
      this.appointmentForm.markAllAsTouched(); // Mark all fields as touched to show errors
      console.warn('Form is invalid, cannot submit.');
      return;
    }

    this.loading = true;
    const formValue = this.appointmentForm.value;

    // Combine date and time for FullCalendar format
    const startISO = new Date(`${formValue.startDate}T${formValue.startTime}`).toISOString();
    const endISO = new Date(`${formValue.endDate}T${formValue.endTime}`).toISOString();

    const appointmentToSave: ClinicEvent = {
      id: this.appointmentId || String(Math.floor(Math.random() * 100000) + 100), // Generate ID for new
      title: `${formValue.patientName} - ${formValue.notes || 'Appointment'}`, // Example title
      start: startISO,
      end: endISO,
      doctor: formValue.doctor,
      room: formValue.room,
      patientName: formValue.patientName,
      notes: formValue.notes,
      color: '#007bff' // Default color
    };

    console.log('Appointment to save:', appointmentToSave);

    // Simulate API call for saving/updating
    setTimeout(() => {
      if (this.isEditMode) {
        console.log('Updating appointment:', appointmentToSave);
        alert('Appointment updated successfully!');
      } else {
        console.log('Creating new appointment:', appointmentToSave);
        alert('Appointment created successfully!');
      }
      this.loading = false;
      this.router.navigate(['/appointment/calendar']); // Redirect to calendar after save
    }, 1000);
  }

  onCancel(): void {
    console.log('Form cancelled.');
    this.router.navigate(['/appointment/calendar']);
  }
}