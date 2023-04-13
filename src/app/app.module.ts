import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BooksComponent } from './modules/books/books.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BooksEffects } from './core/store/books/books.effects';
import {
  booksFeatureKey,
  booksReducer,
} from './core/store/books/books.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BooksFacadeService } from './modules/books/books-facade.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BooksComponent,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      [booksFeatureKey]: booksReducer,
    }),
    EffectsModule.forRoot([BooksEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      autoPause: true,
    }),
    HttpClientModule,
  ],
  providers: [DynamicDialogRef, BooksFacadeService, DialogService],
  bootstrap: [AppComponent],
})
export class AppModule {}
