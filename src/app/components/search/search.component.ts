import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { debounceTime } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './search.component.html' ,
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  private bookService = inject(BooksService);
  private destroyRef = inject(DestroyRef);
  private searchService = inject(SearchService);
  searchControl = new FormControl(this.searchService.searchTerm());

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((term) => {
        const terms = term?.trim() || '';
        this.bookService.filterBooks(terms);
        this.searchService.searchTerm.set(terms);
      });
  }
}
