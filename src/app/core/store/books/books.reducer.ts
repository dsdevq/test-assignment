import { createReducer, on } from '@ngrx/store';
import { IBook } from 'src/app/shared/models/book.interfaces';
import {
  addBook,
  addBookFailure,
  addBookSuccess,
  editBook,
  editBookFailure,
  editBookSuccess,
  loadBooks,
  loadBooksFailure,
  loadBooksSuccess,
} from './books.actions';

export interface IBooksState {
  books: IBook[];
  status: 'pending' | 'loading' | 'success' | 'error';
  error: string | null;
}

export const initialState: IBooksState = {
  books: [],
  status: 'pending',
  error: null,
};

export const booksFeatureKey = 'books';

export const booksReducer = createReducer(
  initialState,
  on(loadBooks, editBook, addBook, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(loadBooksSuccess, (state, { books }) => ({
    ...state,
    books,
    status: 'success',
  })),
  on(editBookSuccess, (state, { book, index }) => {
    const books = [...state.books];
    books[index] = book;

    return {
      ...state,
      books,
      status: 'success',
    };
  }),
  on(addBookSuccess, (state, { book }) => ({
    ...state,
    books: [book, ...state.books],
    status: 'success',
  })),

  // Errors
  on(loadBooksFailure, editBookFailure, addBookFailure, (state, { error }) => ({
    ...state,
    error,
    status: 'error',
  }))
);
