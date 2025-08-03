import { Component, inject } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { SearchComponent } from '../search/search.component';
import { MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-books-list',
  imports: [
    RouterLink,
    MatTableModule,
    MatButtonModule,
    SearchComponent,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent
  ],
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.scss'
})
export class BooksListComponent {
  private bookService = inject(BooksService);
  books = this.bookService.getBooks();
}
