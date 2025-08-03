import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Book } from '../models/book.model';
import { SearchService } from './search.service';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private booksUrl = 'assets/books.json';
  private books = signal<Book[]>([]);
  private filteredBooks = signal<Book[]>([]);

  constructor(private http: HttpClient, private searchService: SearchService) {
    this.loadBooks();
  }

  private loadBooks() {
    this.http.get<Book[]>(this.booksUrl).subscribe((data) => {
      this.books.set(data);
      this.filteredBooks.set(data);
    });
  }

  getBooks() {
    return this.filteredBooks.asReadonly();
  }

  getBook(id: number) {
    return this.books().find((book) => book.id === id);
  }

  addBook(book: Book) {
    const newBook = { ...book, id: this.books().length + 1 };

    if (this.searchService.searchTerm() === '') {
      this.filteredBooks.update((books) => [...books, newBook]);
    }

    this.books.update((books) => [...books, newBook]);
  }

  filterBooks(searchString: string) {
    if (!searchString) {
      this.filteredBooks.set(this.books());

      return;
    }

    const term = searchString.toLowerCase();
    this.filteredBooks.set(
      this.books().filter(
        (book) =>
          book.title.toLowerCase().includes(term) ||
          book.author.toLowerCase().includes(term)
      )
    );
  }
}
