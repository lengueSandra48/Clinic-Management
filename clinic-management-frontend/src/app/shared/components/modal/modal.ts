import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: false,
  templateUrl: './modal.html',
  styleUrl: './modal.scss'
})

export class Modal {
  /**
   * @description Controls the visibility of the modal. Set to `true` to show, `false` to hide.
   */
  @Input() isOpen: boolean = false;

  /**
   * @description The title displayed in the modal header.
   */
  @Input() title: string = '';

  /**
   * @description Emits an event when the modal is closed (e.g., by clicking the close button or outside the modal).
   */
  @Output() closed = new EventEmitter<void>();

  /**
   * @description Emits an event when a confirmation action is triggered within the modal (e.g., clicking a "Save" or "Confirm" button).
   */
  @Output() confirmed = new EventEmitter<void>();

  /**
   * @description Closes the modal and emits the 'closed' event.
   */
  close(): void {
    this.isOpen = false;
    this.closed.emit();
  }

  /**
   * @description Triggers the confirmation action and emits the 'confirmed' event, then closes the modal.
   * You might want to add logic here to handle data or other actions before emitting.
   */
  confirm(): void {
    this.confirmed.emit();
    this.close(); // Or you might want the parent to handle closing after confirmation
  }

  /**
   * @description Handles clicks on the modal background to close the modal.
   * Prevents the click event from propagating to the modal content.
   * @param event The click event.
   */
  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  /**
   * @description Prevents the click event inside the modal content from closing the modal via backdrop click.
   * @param event The click event.
   */
  onModalContentClick(event: MouseEvent): void {
    event.stopPropagation();
  }
}
