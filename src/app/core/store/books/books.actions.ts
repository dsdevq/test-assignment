import { createAction, props } from '@ngrx/store';
import { IBook } from 'src/app/shared/models/book.interfaces';

enum EBooksAction {
  loadBooks = '[Books] Load Books',
  loadBooksSuccess = '[Books] Load Books Success',
  loadBooksFailure = '[Books] Load Books Failure',

  editBook = '[Books] Edit Book',
  editBookSuccess = '[Books] Edit Book Success',
  editBookFailure = '[Books] Edit Book Failure',

  addBook = '[Books] Add Book',
  addBookSuccess = '[Books] Add Book Success',
  addBookFailure = '[Books] Add Book Failure',
}

export const loadBooks = createAction(EBooksAction.loadBooks);
export const loadBooksSuccess = createAction(
  EBooksAction.loadBooksSuccess,
  props<{ books: IBook[] }>()
);
export const loadBooksFailure = createAction(
  EBooksAction.loadBooksFailure,
  props<{ error: string }>()
);

export const editBook = createAction(
  EBooksAction.editBook,
  props<{ book: IBook; index: number }>()
);
export const editBookSuccess = createAction(
  EBooksAction.editBookSuccess,
  props<{ book: IBook; index: number }>()
);
export const editBookFailure = createAction(
  EBooksAction.editBookFailure,
  props<{ error: string }>()
);

export const addBook = createAction(
  EBooksAction.addBook,
  props<{ book: IBook }>()
);
export const addBookSuccess = createAction(
  EBooksAction.addBookSuccess,
  props<{ book: IBook }>()
);
export const addBookFailure = createAction(
  EBooksAction.addBookFailure,
  props<{ error: string }>()
);
