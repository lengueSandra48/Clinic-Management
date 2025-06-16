// src/app/features/appointment/appointment-calendar/appointment-calendar.component.ts

import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

// Define an interface for our custom event data (more specific than EventInput)
// Ensure this is consistent across calendar, form, and detail components
interface ClinicEvent extends EventInput {
  doctor: string;
  room: string;
  patientName?: string; // Added for form/detail
  notes?: string;       // Added for form/detail
}

@Component({
  selector: 'app-appointment-calendar',
  standalone: false, // Set to true if using standalone components
  templateUrl: './appointment-calendar.html',
  styleUrls: ['./appointment-calendar.scss']
})
export class AppointmentCalendar implements OnInit, OnDestroy {
  @ViewChild('fullcalendar') fullcalendar?: FullCalendarComponent;

  loading: boolean = true;
  calendarOptions: CalendarOptions;
  allEvents: ClinicEvent[] = [];
  filteredEvents: ClinicEvent[] = [];

  selectedDoctor: string = '';
  selectedRoom: string = '';

  doctors: { id: number, name: string }[] = [];
  rooms: string[] = [];

  private dataSubscription: Subscription | undefined;

  constructor(private router: Router) {
    this.calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'timeGridWeek',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      weekends: true,
      events: this.filteredEvents,
      eventColor: '#007bff',

      dateClick: this.handleDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventDrop: this.handleEventDrop.bind(this),
      eventResize: this.handleEventResize.bind(this),
      eventAllow: this.eventAllow.bind(this),
      nowIndicator: true,
      slotMinTime: '08:00:00',
      slotMaxTime: '18:00:00',
      expandRows: true,
      height: 'auto'
    };
  }

  ngOnInit(): void {
    console.log('AppointmentCalendarComponent: ngOnInit called');
    this.fetchInitialData();
  }

  ngOnDestroy(): void {
    console.log('AppointmentCalendarComponent: ngOnDestroy called');
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
      console.log('AppointmentCalendarComponent: dataSubscription unsubscribed.');
    }
  }

  fetchInitialData(): void {
    this.loading = true;
    console.log('Fetching initial calendar data...');

    this.dataSubscription = new Subscription();
    setTimeout(() => {
      this.doctors = [
        { id: 1, name: 'Dr. Smith' },
        { id: 2, name: 'Dr. Jones' },
        { id: 3, name: 'Dr. Lee' }
      ];
      this.rooms = ['Room 101', 'Room 102', 'Operating Room'];

      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      this.allEvents = [
        // Ensure dummy data matches ClinicEvent interface
        { id: '1', title: 'John Doe - Checkup', start: this.formatDate(today, 9, 0), end: this.formatDate(today, 9, 30), doctor: 'Dr. Smith', room: 'Room 101', patientName: 'John Doe', notes: 'Routine checkup', color: '#4CAF50' },
        { id: '2', title: 'Jane Roe - Follow-up', start: this.formatDate(today, 10, 0), end: this.formatDate(today, 10, 45), doctor: 'Dr. Jones', room: 'Room 102', patientName: 'Jane Roe', notes: 'Follow-up on recent labs', color: '#2196F3' },
        { id: '3', title: 'Patient X - New Patient', start: this.formatDate(today, 14, 0), end: this.formatDate(today, 15, 0), doctor: 'Dr. Smith', room: 'Room 101', patientName: 'Patient X', notes: 'First visit, general consultation', color: '#4CAF50' },
        { id: '4', title: 'Surgery - Mr. Green', start: this.formatDate(tomorrow, 9, 0), end: this.formatDate(tomorrow, 11, 0), doctor: 'Dr. Lee', room: 'Operating Room', patientName: 'Mr. Green', notes: 'Appendectomy', color: '#F44336' },
        { id: '5', title: 'Medical Exam - Ms. Blue', start: this.formatDate(tomorrow, 11, 30), end: this.formatDate(tomorrow, 12, 15), doctor: 'Dr. Smith', room: 'Room 101', patientName: 'Ms. Blue', notes: 'Annual medical exam', color: '#4CAF50' },
      ];

      this.filterAppointments();
      this.loading = false;
      console.log('Initial calendar data fetched.');
    }, 1000);
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

  filterAppointments(): void {
    console.log('Filtering appointments...');
    this.filteredEvents = this.allEvents.filter(event => {
      const matchDoctor = this.selectedDoctor === '' || event.doctor === this.selectedDoctor;
      const matchRoom = this.selectedRoom === '' || event.room === this.selectedRoom;
      return matchDoctor && matchRoom;
    });

    if (this.fullcalendar) {
      const calendarApi = this.fullcalendar.getApi();
      calendarApi.removeAllEvents();
      calendarApi.addEventSource(this.filteredEvents);
      calendarApi.refetchEvents();
      console.log('Calendar events updated with filters.');
    }
  }

  onNewAppointment(): void {
    console.log('Navigating to new appointment form.');
    this.router.navigate(['/appointment', 'new']); // Navigate to the new appointment form
  }

  handleDateClick(arg: DateClickArg): void {
    console.log('Date clicked:', arg);
    // You could pre-populate the form with the clicked date/time
    this.router.navigate(['/appointment', 'new'], {
      queryParams: {
        startDate: arg.dateStr,
        startTime: new Date(arg.date.setMinutes(arg.date.getMinutes() + 0)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
        endDate: arg.dateStr,
        endTime: new Date(arg.date.setMinutes(arg.date.getMinutes() + 60)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) // Default 1 hour
      }
    });
  }

  handleEventClick(arg: any): void {
    console.log('Event clicked:', arg.event.id, arg.event.title);
    const eventId = arg.event.id;
    this.router.navigate(['/appointment', eventId]); // Navigate to the appointment detail page
  }

  handleEventDrop(arg: any): void {
    console.log('Event dropped:', arg.event.id, 'from', arg.oldEvent.start, 'to', arg.event.start);
    const movedEvent = arg.event;
    const oldEvent = arg.oldEvent;

    const updatedEvent: ClinicEvent = {
      ...movedEvent.toPlainObject(),
      start: movedEvent.start?.toISOString(),
      end: movedEvent.end?.toISOString(),
      doctor: (movedEvent.extendedProps as any)?.doctor,
      room: (movedEvent.extendedProps as any)?.room,
      patientName: (movedEvent.extendedProps as any)?.patientName, // Include patientName
      notes: (movedEvent.extendedProps as any)?.notes // Include notes
    };

    const otherEvents = this.allEvents.filter(e => e.id !== updatedEvent.id);
    if (this.checkConflict(updatedEvent, otherEvents)) {
      alert('Scheduling conflict detected! Reverting event move.');
      arg.revert();
      console.warn('Event move reverted due to conflict.');
      return;
    }

    const index = this.allEvents.findIndex(e => e.id === updatedEvent.id);
    if (index !== -1) {
      this.allEvents[index] = updatedEvent;
      console.log('Event updated in master data:', updatedEvent);
      alert('Appointment moved successfully!');
    }
  }

  handleEventResize(arg: any): void {
    console.log('Event resized:', arg.event.id, 'from', arg.oldEvent.end, 'to', arg.event.end);
    const resizedEvent = arg.event;
    const oldEvent = arg.oldEvent;

    const updatedEvent: ClinicEvent = {
      ...resizedEvent.toPlainObject(),
      start: resizedEvent.start?.toISOString(),
      end: resizedEvent.end?.toISOString(),
      doctor: (resizedEvent.extendedProps as any)?.doctor,
      room: (resizedEvent.extendedProps as any)?.room,
      patientName: (resizedEvent.extendedProps as any)?.patientName, // Include patientName
      notes: (resizedEvent.extendedProps as any)?.notes // Include notes
    };

    const otherEvents = this.allEvents.filter(e => e.id !== updatedEvent.id);
    if (this.checkConflict(updatedEvent, otherEvents)) {
      alert('Scheduling conflict detected! Reverting event resize.');
      arg.revert();
      console.warn('Event resize reverted due to conflict.');
      return;
    }

    const index = this.allEvents.findIndex(e => e.id === updatedEvent.id);
    if (index !== -1) {
      this.allEvents[index] = updatedEvent;
      console.log('Event updated in master data:', updatedEvent);
      alert('Appointment resized successfully!');
    }
  }

  eventAllow(dropInfo: { start: Date, end: Date, allDay: boolean, event?: EventInput, draggedEl?: HTMLElement, resource?: any }): boolean {
    const potentialEvent: ClinicEvent = {
      id: dropInfo.event?.id,
      start: dropInfo.start.toISOString(),
      end: dropInfo.end.toISOString(),
      doctor: (dropInfo.event?.extendedProps as any)?.doctor || this.selectedDoctor || 'Unassigned Doctor',
      room: (dropInfo.event?.extendedProps as any)?.room || this.selectedRoom || 'Unassigned Room',
      title: dropInfo.event?.title || 'New Event',
      patientName: (dropInfo.event?.extendedProps as any)?.patientName,
      notes: (dropInfo.event?.extendedProps as any)?.notes
    };

    const eventsToCheckAgainst = this.allEvents.filter(e => e.id !== potentialEvent.id);

    const hasConflict = this.checkConflict(potentialEvent, eventsToCheckAgainst);
    if (hasConflict) {
      return false;
    }
    return true;
  }

  private checkConflict(potentialEvent: ClinicEvent, existingEvents: ClinicEvent[]): boolean {
    const newStart = new Date(potentialEvent.start as string).getTime();
    const newEnd = new Date(potentialEvent.end as string).getTime();

    for (const existingEvent of existingEvents) {
      if (!existingEvent.start || !existingEvent.end) {
        continue;
      }

      const existingStart = new Date(existingEvent.start as string).getTime();
      const existingEnd = new Date(existingEvent.end as string).getTime();

      const overlaps = (newStart < existingEnd) && (newEnd > existingStart);

      const sameDoctor = potentialEvent.doctor && existingEvent.doctor && potentialEvent.doctor === existingEvent.doctor;
      const sameRoom = potentialEvent.room && existingEvent.room && potentialEvent.room === existingEvent.room;

      if (overlaps && (sameDoctor || sameRoom)) {
        console.warn(`Conflict detected!
          New: ${potentialEvent.title} (${potentialEvent.start} - ${potentialEvent.end}) Doctor: ${potentialEvent.doctor}, Room: ${potentialEvent.room}
          Existing: ${existingEvent.title} (${existingEvent.start} - ${existingEvent.end}) Doctor: ${existingEvent.doctor}, Room: ${existingEvent.room}
        `);
        return true;
      }
    }
    return false;
  }
}