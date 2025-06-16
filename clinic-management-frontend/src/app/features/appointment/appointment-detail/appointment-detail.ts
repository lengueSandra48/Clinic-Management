import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

// Re-using ClinicEvent interface or defining it if not globally available
interface ClinicEvent {
  id?: string;
  title: string;
  start: string; // ISO string
  end: string;   // ISO string
  allDay?: boolean;
  doctor: string;
  room: string;
  patientName?: string;
  notes?: string;
  color?: string;
}

@Component({
  selector: 'app-appointment-detail',
  standalone: false, // Set to true if using standalone components
  templateUrl: './appointment-detail.html',
  styleUrls: ['./appointment-detail.scss'],
  providers: [DatePipe]
})

export class AppointmentDetail implements OnInit {
  appointment: ClinicEvent | undefined;
  loading: boolean = true;
  appointmentId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.appointmentId = params.get('id');
      if (this.appointmentId) {
        this.loadAppointmentDetails(this.appointmentId);
      } else {
        console.warn('No appointment ID provided.');
        this.router.navigate(['/appointment/calendar']); // Redirect if no ID
      }
    });
  }

  loadAppointmentDetails(id: string): void {
    this.loading = true;
    console.log(`Fetching appointment details for ID: ${id}`);

    // Simulate fetching data from a backend
    setTimeout(() => {
      const dummyAppointments: ClinicEvent[] = [
        { id: '1', title: 'John Doe - Checkup', start: this.formatDate(new Date(), 9, 0), end: this.formatDate(new Date(), 9, 30), doctor: 'Dr. Smith', room: 'Room 101', patientName: 'John Doe', notes: 'Routine checkup' },
        { id: '2', title: 'Jane Roe - Follow-up', start: this.formatDate(new Date(), 10, 0), end: this.formatDate(new Date(), 10, 45), doctor: 'Dr. Jones', room: 'Room 102', patientName: 'Jane Roe', notes: 'Follow-up on recent labs' },
        { id: '3', title: 'Patient X - New Patient', start: this.formatDate(new Date(), 14, 0), end: this.formatDate(new Date(), 15, 0), doctor: 'Dr. Smith', room: 'Room 101', patientName: 'Patient X', notes: 'First visit, general consultation' },
        { id: '4', title: 'Surgery - Mr. Green', start: this.formatDate(this.addDays(new Date(), 1), 9, 0), end: this.formatDate(this.addDays(new Date(), 1), 11, 0), doctor: 'Dr. Lee', room: 'Operating Room', patientName: 'Mr. Green', notes: 'Appendectomy' },
        { id: '5', title: 'Medical Exam - Ms. Blue', start: this.formatDate(this.addDays(new Date(), 1), 11, 30), end: this.formatDate(this.addDays(new Date(), 1), 12, 15), doctor: 'Dr. Smith', room: 'Room 101', patientName: 'Ms. Blue', notes: 'Annual medical exam' },
      ];
      this.appointment = dummyAppointments.find(a => a.id === id);

      if (!this.appointment) {
        console.warn(`Appointment with ID ${id} not found.`);
        this.router.navigate(['/appointment/calendar']);
      }
      this.loading = false;
    }, 500);
  }

  // Helper to format date + time into ISO string (re-using from form component for consistency)
  private formatDate(date: Date, hours: number, minutes: number = 0): string {
    const d = new Date(date);
    d.setHours(hours, minutes, 0, 0);
    return d.toISOString();
  }

  // Helper to add days to a date (re-using from form component for consistency)
  private addDays(date: Date, days: number): Date {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
  }

  onEdit(): void {
    if (this.appointmentId) {
      this.router.navigate(['/appointment', this.appointmentId, 'edit']);
    }
  }

  onDelete(): void {
    if (confirm('Are you sure you want to delete this appointment?')) {
      this.loading = true;
      // Simulate API call to delete
      setTimeout(() => {
        alert('Appointment deleted successfully!');
        this.loading = false;
        this.router.navigate(['/appointment/calendar']); // Go back to calendar
      }, 500);
    }
  }

  onBack(): void {
    this.router.navigate(['/appointment/calendar']);
  }
}