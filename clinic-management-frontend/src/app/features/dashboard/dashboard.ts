// src/app/features/dashboard/dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html', 
  styleUrls: ['./dashboard.scss'] 
})
export class Dashboard implements OnInit { // <--- UPDATED class name
  constructor(private router: Router) { }

  ngOnInit(): void {
    // Implement dashboard initialization logic here
    console.log('DashboardComponent initialized!');
  }

  onNewAppointment(): void {
    console.log('Dashboard: Navigating to new appointment form.');
    this.router.navigate(['/appointment', 'new']);
  }

  onViewPatients(): void {
    console.log('Dashboard: Navigating to patients list.');
    // Example: Navigate to a patients list route if you have one
    // this.router.navigate(['/patients']);
    alert('Simulating navigation to Patients list.');
  }

  onViewDoctors(): void {
    console.log('Dashboard: Navigating to doctors list.');
    // Example: Navigate to a doctors list route if you have one
    // this.router.navigate(['/doctors']);
    alert('Simulating navigation to Doctors list.');
  }

  onViewReports(): void {
    console.log('Dashboard: Navigating to reports section.');
    // Example: Navigate to a reports route if you have one
    // this.router.navigate(['/reports']);
    alert('Simulating navigation to Reports section.');
  }

  // You can add more methods for other dashboard actions
}