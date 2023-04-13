import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
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
import { BooksService } from '../../services/books.service';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Injectable()
export class BooksEffects {
  loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBooks),
      switchMap(() =>
        this.booksHttpService.getBooks().pipe(
          map((books) => loadBooksSuccess({ books })),
          catchError((error) => of(loadBooksFailure({ error: error.message })))
        )
      )
    )
  );

  editBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editBook),
      switchMap(({ book, index }) =>
        this.booksHttpService.editBook(book).pipe(
          map((book) => editBookSuccess({ book, index })),
          catchError((error) => of(editBookFailure({ error: error.message })))
        )
      )
    )
  );

  addBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addBook),
      switchMap(({ book }) =>
        this.booksHttpService.addBook(book).pipe(
          tap(() => {
            this.dialogService.dialogComponentRefMap.forEach((dialog) => {
              dialog.destroy();
            });
          }),
          map((book) => addBookSuccess({ book })),
          catchError((error) => of(addBookFailure({ error: error.message })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private booksHttpService: BooksService,
    private ref: DynamicDialogRef,
    private dialogService: DialogService
  ) {}
}
