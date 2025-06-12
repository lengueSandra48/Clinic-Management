import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core'; // <-- CalendarOptions and EventInput from core
import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
// REMOVE EventDropArg and EventResizeArg from here
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'; // <-- DateClickArg is fine
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

// Define an interface for our custom event data (more specific than EventInput)
interface ClinicEvent extends EventInput {
  doctor: string;
  room: string;
}

@Component({
  selector: 'app-appointment-calendar',
  standalone: false,
  templateUrl: './appointment-calendar.html',
  styleUrl: './appointment-calendar.scss'
})

export class AppointmentCalendar implements OnInit, OnDestroy {
 @ViewChild('fullcalendar') fullcalendar?: FullCalendarComponent;

  loading: boolean = true;
  calendarOptions: CalendarOptions;
  allEvents: ClinicEvent[] = []; // Stores all fetched events
  filteredEvents: ClinicEvent[] = []; // Events currently displayed on calendar

  selectedDoctor: string = '';
  selectedRoom: string = '';

  doctors: { id: number, name: string }[] = [];
  rooms: string[] = [];

  private dataSubscription: Subscription | undefined;

  constructor(private router: Router) {
    // Initialize calendar options
    this.calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'timeGridWeek', // Default view (can be dayGridMonth, timeGridDay, etc.)
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      editable: true, // Allow events to be dragged and resized
      selectable: true, // Allow selection of date/time slots
      selectMirror: true, // Show a "mirror" event while dragging selection
      dayMaxEvents: true, // Allow "more" link when too many events
      weekends: true,
      events: this.filteredEvents, // Binds events to the calendar
      eventColor: '#007bff', // Default event color

      // Callbacks for user interaction
      dateClick: this.handleDateClick.bind(this), // Handle clicking on a date/time slot
      eventClick: this.handleEventClick.bind(this), // Handle clicking on an existing event
      eventDrop: this.handleEventDrop.bind(this), // Handle event being dragged and dropped
      eventResize: this.handleEventResize.bind(this), // Handle event being resized
      eventAllow: this.eventAllow.bind(this), // Prevent dragging onto occupied slots client-side
      nowIndicator: true, // Show current time indicator
      slotMinTime: '08:00:00', // Clinic opens 8 AM
      slotMaxTime: '18:00:00', // Clinic closes 6 PM
      expandRows: true, // Expand rows to fill height
      height: 'auto' // Make calendar height responsive
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

    // Simulate API calls for doctors, rooms, and appointments
    this.dataSubscription = new Subscription(); // Dummy subscription
    setTimeout(() => {
      this.doctors = [
        { id: 1, name: 'Dr. Smith' },
        { id: 2, name: 'Dr. Jones' },
        { id: 3, name: 'Dr. Lee' }
      ];
      this.rooms = ['Room 101', 'Room 102', 'Operating Room'];

      // Dummy appointments
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      this.allEvents = [
        { id: '1', title: 'John Doe - Checkup', start: this.addHours(today, 9), end: this.addHours(today, 9, 30), doctor: 'Dr. Smith', room: 'Room 101', color: '#4CAF50' },
        { id: '2', title: 'Jane Roe - Follow-up', start: this.addHours(today, 10), end: this.addHours(today, 10, 45), doctor: 'Dr. Jones', room: 'Room 102', color: '#2196F3' },
        { id: '3', title: 'Patient X - New Patient', start: this.addHours(today, 14), end: this.addHours(today, 15, 0), doctor: 'Dr. Smith', room: 'Room 101', color: '#4CAF50' },
        { id: '4', title: 'Surgery - Mr. Green', start: this.addHours(tomorrow, 9), end: this.addHours(tomorrow, 11, 0), doctor: 'Dr. Lee', room: 'Operating Room', color: '#F44336' },
        { id: '5', title: 'Medical Exam - Ms. Blue', start: this.addHours(tomorrow, 11, 30), end: this.addHours(tomorrow, 12, 15), doctor: 'Dr. Smith', room: 'Room 101', color: '#4CAF50' },
      ];

      this.filterAppointments(); // Apply initial filters (which are none by default)
      this.loading = false;
      console.log('Initial calendar data fetched.');
    }, 1000);
  }

  // Helper to add hours and minutes to a date
  private addHours(date: Date, hours: number, minutes: number = 0): Date {
    const newDate = new Date(date);
    newDate.setHours(hours, minutes, 0, 0);
    return newDate;
  }

  filterAppointments(): void {
    console.log('Filtering appointments...');
    this.filteredEvents = this.allEvents.filter(event => {
      const matchDoctor = this.selectedDoctor === '' || event.doctor === this.selectedDoctor;
      const matchRoom = this.selectedRoom === '' || event.room === this.selectedRoom;
      return matchDoctor && matchRoom;
    });

    // Update the calendar's events directly
    if (this.fullcalendar) {
      const calendarApi = this.fullcalendar.getApi();
      calendarApi.removeAllEvents(); // Clear existing events
      calendarApi.addEventSource(this.filteredEvents); // Add filtered events
      calendarApi.refetchEvents(); // Ensure calendar re-renders
      console.log('Calendar events updated with filters.');
    }
  }

  onNewAppointment(): void {
    console.log('New Appointment button clicked');
    alert('Simulating opening a form for a new appointment.');
    // In a real app, you'd navigate or open a modal:
    // this.router.navigate(['/appointment', 'new']);
  }

  // --- FullCalendar Interaction Handlers ---

  handleDateClick(arg: DateClickArg): void {
    console.log('Date clicked:', arg);
    const newAppointmentTitle = prompt('Enter a title for the new appointment:');
    if (newAppointmentTitle) {
      const newEvent: ClinicEvent = {
        title: newAppointmentTitle,
        start: arg.dateStr,
        end: new Date(new Date(arg.dateStr).getTime() + 60 * 60 * 1000).toISOString(), // Default 1 hour
        allDay: arg.allDay,
        doctor: this.selectedDoctor || 'Unassigned Doctor', // Use current filter or default
        room: this.selectedRoom || 'Unassigned Room', // Use current filter or default
        id: String(this.allEvents.length + 1) // Simple unique ID
      };

      // Perform conflict check before adding
      if (this.checkConflict(newEvent, this.allEvents)) {
        alert('Scheduling conflict detected! This slot is already occupied for the selected doctor/room.');
        return;
      }

      console.log('Adding new event:', newEvent);
      this.allEvents.push(newEvent); // Add to master list
      this.filterAppointments(); // Re-filter to display
      alert('Appointment added successfully!');
    }
  }

  handleEventClick(arg: any): void {
    console.log('Event clicked:', arg.event.id, arg.event.title);
    const eventId = arg.event.id;
    alert(`Simulating opening edit form for appointment: ${arg.event.title} (ID: ${eventId})`);
    // In a real app, you'd navigate or open a modal for editing:
    // this.router.navigate(['/appointment', eventId, 'edit']);
  }

  handleEventDrop(arg: any): void { // Using 'any' as EventDropArg is not exported
    console.log('Event dropped:', arg.event.id, 'from', arg.oldEvent.start, 'to', arg.event.start);
    const movedEvent = arg.event;
    const oldEvent = arg.oldEvent; // Keep a reference to revert if needed

    const updatedEvent: ClinicEvent = {
      ...movedEvent.toPlainObject(), // Get all event properties
      start: movedEvent.start?.toISOString(),
      end: movedEvent.end?.toISOString(),
      doctor: (movedEvent.extendedProps as any)?.doctor, // Access custom props
      room: (movedEvent.extendedProps as any)?.room,
    };

    // Perform conflict check with ALL events, excluding the event itself
    const otherEvents = this.allEvents.filter(e => e.id !== updatedEvent.id);
    if (this.checkConflict(updatedEvent, otherEvents)) {
      alert('Scheduling conflict detected! Reverting event move.');
      arg.revert(); // Revert the visual change on the calendar
      console.warn('Event move reverted due to conflict.');
      return;
    }

    // Update the event in your master data source (this.allEvents)
    const index = this.allEvents.findIndex(e => e.id === updatedEvent.id);
    if (index !== -1) {
      this.allEvents[index] = updatedEvent;
      console.log('Event updated in master data:', updatedEvent);
      alert('Appointment moved successfully!');
    }
  }

  handleEventResize(arg: any): void { // Using 'any' as EventResizeArg is not exported
    console.log('Event resized:', arg.event.id, 'from', arg.oldEvent.end, 'to', arg.event.end);
    const resizedEvent = arg.event;
    const oldEvent = arg.oldEvent; // Keep a reference to revert if needed

    const updatedEvent: ClinicEvent = {
      ...resizedEvent.toPlainObject(),
      start: resizedEvent.start?.toISOString(),
      end: resizedEvent.end?.toISOString(),
      doctor: (resizedEvent.extendedProps as any)?.doctor,
      room: (resizedEvent.extendedProps as any)?.room,
    };

    // Perform conflict check with ALL events, excluding the event itself
    const otherEvents = this.allEvents.filter(e => e.id !== updatedEvent.id);
    if (this.checkConflict(updatedEvent, otherEvents)) {
      alert('Scheduling conflict detected! Reverting event resize.');
      arg.revert(); // Revert the visual change on the calendar
      console.warn('Event resize reverted due to conflict.');
      return;
    }

    // Update the event in your master data source (this.allEvents)
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
      title: dropInfo.event?.title || 'New Event'
    };

    // Filter events to exclude the current event being moved/resized from conflict check
    const eventsToCheckAgainst = this.allEvents.filter(e => e.id !== potentialEvent.id);

    const hasConflict = this.checkConflict(potentialEvent, eventsToCheckAgainst);
    if (hasConflict) {
      return false; // Prevent the drop/resize visually
    }
    return true; // Allow the drop/resize
  }

  /**
   * Core conflict detection logic.
   * Checks if a potential event overlaps with any existing events for the same doctor/room.
   */
  private checkConflict(potentialEvent: ClinicEvent, existingEvents: ClinicEvent[]): boolean {
    const newStart = new Date(potentialEvent.start as string).getTime();
    const newEnd = new Date(potentialEvent.end as string).getTime();

    for (const existingEvent of existingEvents) {
      // Ensure existing event has start and end times for comparison
      if (!existingEvent.start || !existingEvent.end) {
        continue;
      }

      const existingStart = new Date(existingEvent.start as string).getTime();
      const existingEnd = new Date(existingEvent.end as string).getTime();

      // Check for overlap: (start1 < end2) && (end1 > start2)
      const overlaps = (newStart < existingEnd) && (newEnd > existingStart);

      // Check if it's the same doctor OR same room (or both, depending on clinic rules)
      const sameDoctor = potentialEvent.doctor && existingEvent.doctor && potentialEvent.doctor === existingEvent.doctor;
      const sameRoom = potentialEvent.room && existingEvent.room && potentialEvent.room === existingEvent.room;

      // Conflict if:
      // 1. Times overlap AND (same doctor OR same room)
      //    (This is a simplified rule; a real clinic might allow multiple doctors in one room, or one doctor in multiple rooms simultaneously, but this is a common starting point)
      // For simplicity, let's assume one doctor cannot have two appointments at the same time,
      // and one room cannot be booked for two appointments at the same time.
      if (overlaps && (sameDoctor || sameRoom)) {
        // The console.warn line here directly accesses potentialEvent and existingEvent
        // which are parameters and loop variables, so they are definitely in scope.
        console.warn(`Conflict detected!
          New: ${potentialEvent.title} (${potentialEvent.start} - ${potentialEvent.end}) Doctor: ${potentialEvent.doctor}, Room: ${potentialEvent.room}
          Existing: ${existingEvent.title} (${existingEvent.start} - ${existingEvent.end}) Doctor: ${existingEvent.doctor}, Room: ${existingEvent.room}
        `);
        return true; // Conflict found
      }
    }
    return false; // No conflict
  }
}
