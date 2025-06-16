import { Directive, EventEmitter, HostListener, Output, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

/**
 * @description An attribute directive that debounces click events on its host element.
 * Useful for preventing multiple rapid clicks, especially on submit buttons.
 *
 * @usage
 * Apply to any clickable element: `<button (appDebounceClick)="submitData()">Submit</button>`
 * You can also set a custom debounce time: `<button (appDebounceClick)="save()" [debounceTime]="500">Save</button>`
 */

@Directive({
  selector: '[appDebounceClick]',
  standalone: false
})

export class DebounceClick implements OnDestroy {
  /**
   * @description The time in milliseconds to wait after a click before emitting the event.
   * Defaults to 400ms.
   */
  @Input() debounceTime: number = 400;

  /**
   * @description Emits an event when a debounced click occurs.
   */
  @Output() appDebounceClick = new EventEmitter<any>();

  private clicks = new Subject<any>(); // Subject to push click events into
  private destroy$ = new Subject<void>(); // Used to unsubscribe

  constructor() {
    this.clicks.pipe(
      debounceTime(this.debounceTime), // Apply debounce time from input
      takeUntil(this.destroy$) // Unsubscribe on destroy
    ).subscribe(e => this.appDebounceClick.emit(e)); // Emit the debounced click
  }

  /**
   * @description HostListener for the click event on the element the directive is applied to.
   * Pushes the event into the 'clicks' Subject.
   * @param event The native click event.
   */
  @HostListener('click', ['$event'])
  onClick(event: any): void {
    event.stopPropagation(); // Prevent click from bubbling up immediately
    this.clicks.next(event);
  }

  /**
   * @description Lifecycle hook called when the directive is destroyed.
   * Used to clean up the RxJS subscription.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}