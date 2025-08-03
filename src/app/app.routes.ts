import { Routes } from '@angular/router';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { AddBookComponent } from './components/add-book/add-book.component';

export const routes: Routes = [
  { path: '', component: BooksListComponent },
  { path: 'book/:id', component: BookDetailComponent },
  { path: 'add', component: AddBookComponent },
  { path: '**', redirectTo: '' }
];
