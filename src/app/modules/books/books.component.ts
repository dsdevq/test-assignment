import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksListComponent } from './components/books-list/books-list.component';
import { BooksFacadeService } from './books-facade.service';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, BooksListComponent],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
  providers: [BooksFacadeService],
})
export class BooksComponent {}
