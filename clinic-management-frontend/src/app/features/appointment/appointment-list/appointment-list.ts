import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-appointment-list',
  standalone: false,
  templateUrl: './appointment-list.html',
  styleUrl: './appointment-list.scss'
})

export class AppointmentList implements OnInit, OnDestroy {
  loading: boolean = true;
  appointments: any[] = [];
  private dataSubscription: Subscription | undefined;

  constructor() {
    console.log('AppointmentListComponent: Constructor called');
  }

  ngOnInit(): void {
    console.log('AppointmentListComponent: ngOnInit called');
    this.fetchAppointments();
  }

  ngOnDestroy(): void {
    console.log('AppointmentListComponent: ngOnDestroy called');
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
      console.log('AppointmentListComponent: dataSubscription unsubscribed.');
    }
  }

  fetchAppointments(): void {
    this.loading = true;
    console.log('AppointmentListComponent: Fetching appointment data...');

    // Simulate API call
    this.dataSubscription = new Subscription(); // Dummy subscription
    setTimeout(() => {
      this.appointments = [
        { id: 1, patient: 'Alice Johnson', doctor: 'Dr. Smith', date: '2025-06-15', time: '10:00 AM', status: 'Confirmed' },
        { id: 2, patient: 'Bob Williams', doctor: 'Dr. Jones', date: '2025-06-15', time: '11:30 AM', status: 'Pending' },
      ];
      this.loading = false;
      console.log('AppointmentListComponent: Appointment data fetched.');
    }, 800);
  }

  onViewDetails(appointment: any): void {
    console.log('Viewing appointment details:', appointment);
    alert(`Viewing details for appointment ${appointment.id}`);
  }

  onAddAppointment(): void {
    console.log('Adding a new appointment');
    alert('Simulating adding a new appointment');
  }
}