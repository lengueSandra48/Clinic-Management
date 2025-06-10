import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: false,
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss'
})

export class Pagination {
 /**
   * @description The currently active page number. Starts from 1.
   */
  @Input() currentPage: number = 1;

  /**
   * @description The total number of items across all pages.
   */
  @Input() totalItems: number = 0;

  /**
   * @description The number of items to display per page.
   */
  @Input() itemsPerPage: number = 10;

  /**
   * @description Emits the new page number when the user clicks a pagination link.
   */
  @Output() pageChange = new EventEmitter<number>();

  /**
   * @description The total number of available pages, calculated based on totalItems and itemsPerPage.
   */
  totalPages: number = 1;

  /**
   * @description An array of page numbers to display in the pagination control.
   * Includes special value -1 to represent an ellipsis (...).
   */
  pages: (number | -1)[] = [];

  /**
   * @description Lifecycle hook that responds when Angular sets or resets data-bound input properties.
   * Used to recalculate total pages and generate page numbers whenever relevant inputs change.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalItems'] || changes['itemsPerPage'] || changes['currentPage']) {
      this.totalPages = Math.max(1, Math.ceil(this.totalItems / this.itemsPerPage)); // Ensure at least 1 page
      // Ensure currentPage stays within valid bounds
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
      } else if (this.currentPage < 1) {
        this.currentPage = 1;
      }
      this.generatePageNumbers();
    }
  }

  /**
   * @description Navigates to a specific page number.
   * Emits the 'pageChange' event if the new page is valid and different from the current page.
   * @param pageNumber The page number to navigate to.
   */
  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages && pageNumber !== this.currentPage) {
      this.pageChange.emit(pageNumber);
    }
  }

  /**
   * @description Generates the array of page numbers to display in the pagination UI.
   * It aims to show the current page, a few pages around it, and the first/last pages with ellipses if needed.
   * This logic can be adjusted for different pagination display strategies.
   */
  private generatePageNumbers(): void {
    this.pages = [];
    const maxPagesToShow = 5; // Total number of page buttons to show (including current, excluding first/last/ellipses)
    const sidePages = Math.floor((maxPagesToShow - 1) / 2); // Pages to show on each side of current

    let startPage = Math.max(1, this.currentPage - sidePages);
    let endPage = Math.min(this.totalPages, this.currentPage + sidePages);

    // Adjust start/end if we're near the beginning or end
    if (endPage - startPage + 1 < maxPagesToShow) {
      if (startPage === 1) {
        endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1);
      } else if (endPage === this.totalPages) {
        startPage = Math.max(1, this.totalPages - maxPagesToShow + 1);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      this.pages.push(i);
    }

    // Add first page and ellipsis if needed
    if (startPage > 1) {
      if (startPage > 2) {
        this.pages.unshift(-1); // Ellipsis
      }
      this.pages.unshift(1); // First page
    }

    // Add last page and ellipsis if needed
    if (endPage < this.totalPages) {
      if (endPage < this.totalPages - 1) {
        this.pages.push(-1); // Ellipsis
      }
      this.pages.push(this.totalPages); // Last page
    }
  }

  /**
   * @description TrackBy function for ngFor loop in the template.
   * Improves performance by helping Angular identify which items have changed, been added, or removed.
   * @param index The index of the item in the array.
   * @param page The page number or -1 for ellipsis.
   * @returns A unique identifier for the item.
   */
  trackByPageNumber(index: number, page: number | -1): number | string {
    return page; // Returns the page number itself as the unique identifier
  }
}