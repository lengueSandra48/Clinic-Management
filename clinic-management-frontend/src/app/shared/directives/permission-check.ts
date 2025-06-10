import { Directive, Input, TemplateRef, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../core/services/auth.service'; // Ensure this path is correct
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * @description A structural directive that renders an element only if the current user
 * has the specified permission(s).
 *
 * @usage
 * Use as: `<div *appHasPermission="'view_patients'">...</div>`
 * Or with multiple permissions (user needs at least one): `<button *appHasPermission="['edit_patient', 'admin']">...</button>`
 */
@Directive({
  selector: '[appHasPermission]', // The attribute selector for HTML usage
  standalone: false
})
export class PermissionCheck implements OnInit, OnDestroy {
  /**
   * @description The permission(s) required to display the element.
   * Can be a single string (e.g., 'delete_patient') or an array of string (e.g., ['edit_patient', 'admin']).
   * If an array is provided, the user needs at least one of the permissions.
   */
  @Input() appHasPermission: string | string[] = '';

  private hasView = false; // Internal flag to track if the view has been rendered
  private destroy$ = new Subject<void>(); // Used to unsubscribe from observables

  constructor(
    private templateRef: TemplateRef<any>, // Represents the template that the directive is applied to
    private viewContainer: ViewContainerRef, // The container where the template can be added or removed
    private authService: AuthService // Our service to check permissions
  ) {}

  /**
   * @description Lifecycle hook called after data-bound properties are initialized.
   * Subscribes to permission changes and updates view visibility.
   */
  ngOnInit(): void {
    // This subscribes to the currentUserPermissions$ observable from the AuthService
    // and reacts whenever the user's permissions change (e.g., after login/logout).
    this.authService.currentUserPermissions$
      .pipe(takeUntil(this.destroy$)) // Automatically unsubscribe when component is destroyed
      .subscribe(() => {
        this.updateView();
      });
  }

  /**
   * @description Updates the visibility of the element based on the current user's permissions.
   * If the user has the required permission(s), the element is rendered; otherwise, it's removed.
   */
  private updateView(): void {
    if (!this.appHasPermission) {
      // If no permission is specified, assume it should always be visible (or handle as an error)
      if (!this.hasView) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.hasView = true;
      }
      return;
    }

    // This calls the hasPermission method on the AuthService, which now correctly
    // checks against the current user's permissions managed by the AuthService.
    const hasAccess = this.authService.hasPermission(this.appHasPermission);

    if (hasAccess && !this.hasView) {
      // If user has permission and view is not yet rendered, render it
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!hasAccess && this.hasView) {
      // If user does not have permission and view is rendered, clear it
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

  /**
   * @description Lifecycle hook called when the directive is destroyed.
   * Used to clean up subscriptions to prevent memory leaks.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}