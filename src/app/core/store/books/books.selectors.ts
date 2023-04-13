import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IBooksState, booksFeatureKey } from './books.reducer';

export const selectBooksState =
  createFeatureSelector<IBooksState>(booksFeatureKey);

export const selectBooks = createSelector(
  selectBooksState,
  ({ books }) => books
);
