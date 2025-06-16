import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-role-management',
  standalone: false,
  templateUrl: './role-management.html',
  styleUrl: './role-management.scss'
})

export class RoleManagement implements OnInit, OnDestroy {
  loading: boolean = true;
  roles: any[] = [];
  private dataSubscription: Subscription | undefined;

  constructor() {
    console.log('RoleManagementComponent: Constructor called');
  }

  ngOnInit(): void {
    console.log('RoleManagementComponent: ngOnInit called');
    this.fetchRoles();
  }

  ngOnDestroy(): void {
    console.log('RoleManagementComponent: ngOnDestroy called');
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
      console.log('RoleManagementComponent: dataSubscription unsubscribed.');
    }
  }

  fetchRoles(): void {
    this.loading = true;
    console.log('RoleManagementComponent: Fetching role data...');

    // Simulate API call
    this.dataSubscription = new Subscription(); // Dummy subscription
    setTimeout(() => {
      this.roles = [
        { id: 1, name: 'Admin', description: 'Full access to all system features.' },
        { id: 2, name: 'Doctor', description: 'Manage patients, appointments, write prescriptions, view reports.' },
        { id: 3, name: 'Secretary', description: 'Manage appointments, patient registration, billing.' },
        { id: 4, name: 'Nurse', description: 'Manage patient vitals, assist doctors, manage lab results.' },
        { id: 5, name: 'Guest', description: 'Limited read-only access (for public info, if applicable).' },
      ];
      this.loading = false;
      console.log('RoleManagementComponent: Role data fetched.');
    }, 700);
  }

  onAddRole(): void {
    console.log('Add New Role clicked');
    alert('Simulating opening a form to add a new role.');
    // In a real app, navigate to a role creation form or open a dialog
  }

  onEditRole(role: any): void {
    console.log('Edit Role clicked for:', role);
    alert(`Simulating opening a form to edit role: ${role.name}`);
    // In a real app, navigate to a role edit form or open a dialog, passing role.id
  }

  onDeleteRole(role: any): void {
    console.log('Delete Role clicked for:', role);
    if (confirm(`Are you sure you want to delete role "${role.name}"? This will affect all users with this role.`)) {
      // Simulate API call to delete role
      console.log(`Simulating API call to delete role: ${role.name}`);
      this.roles = this.roles.filter(r => r.id !== role.id); // Optimistically remove from UI
      alert(`Role "${role.name}" deleted.`);
    }
  }
}