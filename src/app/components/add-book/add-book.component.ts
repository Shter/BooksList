import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BooksService }       from '../../services/books.service';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-add-book',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.scss',
})
export class AddBookComponent {
  private fb = inject(FormBuilder);
  private bookService = inject(BooksService);
  private router = inject(Router);

  bookForm = this.fb.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    year: [0, [Validators.required, Validators.min(1000)]],
    description: [''],
  });

  onSubmit() {
    if (this.bookForm.valid) {
      this.bookService.addBook(this.bookForm.value as Book);
      this.router.navigate(['/']);
    }
  }
}
