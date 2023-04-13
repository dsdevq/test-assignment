import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { map } from 'rxjs';

import { Table, TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { Calendar, CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ChartModule } from 'primeng/chart';
import { DialogService } from 'primeng/dynamicdialog';

import { DialogComponent } from '../dialog/dialog.component';
import { ChartComponent } from '../chart/chart.component';
import { BooksFacadeService } from '../../books-facade.service';
import { IBook } from 'src/app/shared/models/book.interfaces';
import { SaveFileService } from 'src/app/core/services/save-file.service';

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    PaginatorModule,
    InputTextModule,
    ChartModule,
    DialogComponent,
    ButtonModule,
    CalendarModule,
    ChartComponent,
    FormsModule,
  ],
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent implements OnInit {
  @ViewChild('table') table: Table;
  @ViewChild('calendar') calendar: Calendar;
  @ViewChild(ChartComponent) chartComponent: ChartComponent;

  public rangeDates: Date[];

  public columns = [
    { field: 'title', header: 'Title' },
    { field: 'pageCount', header: 'Page Count' },
    { field: 'publishDate', header: 'Publish Date' },
    { field: 'description', header: 'Description' },
    { field: 'excerpt', header: 'Excerpt' },
  ];

  public books$ = this.booksService.books$.pipe(
    map((books) =>
      books.map((book) => ({
        ...book,
        publishDate: new Date(book.publishDate),
      }))
    )
  );

  constructor(
    private booksService: BooksFacadeService,
    private dialogService: DialogService,
    private saveFileService: SaveFileService
  ) {}

  ngOnInit(): void {
    this.booksService.loadBooks();
  }

  public setRangeForDate(range: 'year' | 'month') {
    const now = new Date();
    let start: Date = new Date();
    let end: Date = new Date();
    if (range === 'month') {
      start = new Date(now.getFullYear(), now.getMonth(), 1);
      end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    }
    if (range === 'year') {
      start = new Date(now.getFullYear(), 0, 1);
      end = new Date(now.getFullYear(), 12, 0);
    }
    this.rangeDates = [start, end];
    this.calendar.onSelect.emit(this.rangeDates);
  }

  public clearFilters(): void {
    this.table.clear();
  }

  public openModal(data?: { book: IBook; index: number }) {
    this.dialogService.open(DialogComponent, {
      width: '500px',
      header: data ? `Edit ${data.book.title}` : 'Add a new book',
      ...(data && { data: { ...data.book, index: data.index } }),
      styleClass: 'dialog-content',
    });
  }

  public filterValue(event: Event): void {
    this.table.filter(
      (event.target as HTMLTextAreaElement).value,
      'title',
      'contains'
    );
  }

  public saveAsExcel() {
    this.saveFileService.saveAsExcel(
      this.table,
      this.chartComponent.chart.chart
    );
  }

  public saveAsPDF() {
    const image = this.chartComponent.chart.getBase64Image();
    this.saveFileService.saveAsPDF(this.table, image);
  }
}
