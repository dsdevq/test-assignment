import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule, UIChart } from 'primeng/chart';
import { ChartData, ChartOptions } from 'chart.js';
import { BooksFacadeService } from '../../books-facade.service';
import { Observable, map } from 'rxjs';
import { chartOptions } from './chart.utils';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule, ChartModule],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  @ViewChild('chart') chart: UIChart;
  public chartData$: Observable<ChartData>;
  public chartOptions: ChartOptions = chartOptions;

  constructor(private booksService: BooksFacadeService) {}

  ngOnInit(): void {
    this.init();
  }
  private init() {
    this.chartData$ = this.booksService.books$.pipe(
      map((books) => {
        const years = Array.from(
          new Set(books.map((book) => new Date(book.publishDate).getFullYear()))
        );

        return {
          labels: years.map((year) => year.toString()),
          datasets: [
            {
              label: 'Books quantity',
              backgroundColor: '#42A5F5',
              data: years.map(
                (year) =>
                  books.filter(
                    (book) => new Date(book.publishDate).getFullYear() === year
                  ).length
              ),
            },
          ],
        };
      })
    );
  }
}
