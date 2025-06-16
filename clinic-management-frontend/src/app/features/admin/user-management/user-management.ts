import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-management',
  standalone: false,
  templateUrl: './user-management.html',
  styleUrl: './user-management.scss'
})

export class UserManagement implements OnInit, OnDestroy {
  loading: boolean = true;
  users: any[] = [];
  private dataSubscription: Subscription | undefined;

  constructor() {
    console.log('UserManagementComponent: Constructor called');
  }

  ngOnInit(): void {
    console.log('UserManagementComponent: ngOnInit called');
    this.fetchUsers();
  }

  ngOnDestroy(): void {
    console.log('UserManagementComponent: ngOnDestroy called');
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
      console.log('UserManagementComponent: dataSubscription unsubscribed.');
    }
  }

  fetchUsers(): void {
    this.loading = true;
    console.log('UserManagementComponent: Fetching user data...');

    // Simulate API call
    this.dataSubscription = new Subscription(); // Dummy subscription
    setTimeout(() => {
      this.users = [
        { id: 1, username: 'Dr. Smith', email: 'smith@clinic.com', role: 'Doctor', status: 'Active' },
        { id: 2, username: 'Jane Doe', email: 'jane.d@clinic.com', role: 'Secretary', status: 'Active' },
        { id: 3, username: 'Admin User', email: 'admin@clinic.com', role: 'Admin', status: 'Active' },
        { id: 4, username: 'Nurse Emily', email: 'emily.n@clinic.com', role: 'Nurse', status: 'Inactive' },
        { id: 5, username: 'Dr. White', email: 'white@clinic.com', role: 'Doctor', status: 'Active' },
      ];
      this.loading = false;
      console.log('UserManagementComponent: User data fetched.');
    }, 800);
  }

  onAddUser(): void {
    console.log('Add New User clicked');
    alert('Simulating opening a form to add a new user.');
    // In a real app, you'd navigate to a user creation form or open a dialog
  }

  onEditUser(user: any): void {
    console.log('Edit User clicked for:', user);
    alert(`Simulating opening a form to edit user: ${user.username}`);
    // In a real app, you'd navigate to a user edit form or open a dialog, passing user.id
  }

  onToggleUserStatus(user: any): void {
    console.log('Toggle User Status clicked for:', user);
    const newStatus = user.status === 'Active' ? 'Inactive' : 'Active';
    const confirmMessage = `Are you sure you want to ${newStatus === 'Active' ? 'activate' : 'deactivate'} ${user.username}?`;

    if (confirm(confirmMessage)) {
      // Simulate API call to update status
      console.log(`Simulating API call to change status of ${user.username} to ${newStatus}`);
      // In a real app, you'd make an actual API call and then refresh the list or update the specific user
      user.status = newStatus; // Optimistically update UI
      alert(`User ${user.username} status changed to ${newStatus}.`);
    }
  }

  onDeleteUser(user: any): void {
    console.log('Delete User clicked for:', user);
    if (confirm(`Are you sure you want to delete user ${user.username}? This action cannot be undone.`)) {
      // Simulate API call to delete user
      console.log(`Simulating API call to delete user: ${user.username}`);
      this.users = this.users.filter(u => u.id !== user.id); // Optimistically remove from UI
      alert(`User ${user.username} deleted.`);
    }
  }
}