import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addBook,
  editBook,
  loadBooks,
} from 'src/app/core/store/books/books.actions';
import { selectBooks } from 'src/app/core/store/books/books.selectors';
import { IBook } from 'src/app/shared/models/book.interfaces';

@Injectable()
export class BooksFacadeService {
  public books$ = this.store.select(selectBooks);

  constructor(private store: Store) {}

  public addBook(book: IBook): void {
    this.store.dispatch(addBook({ book }));
  }

  public editBook(book: IBook, index: number) {
    this.store.dispatch(editBook({ book, index }));
  }

  public loadBooks(): void {
    this.store.dispatch(loadBooks());
  }
}
